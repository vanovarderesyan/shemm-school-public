import PartnersDetail from '../domain/entities/PartnersDetail';
import Partners from '../models/Partners';
import BillingAccount from '../models/BillingAccount';
import AdditionalAddressePartners from '../models/AdditionalAddressePartners';
import transform from '../utils/transform';
import PartnersPayload from '../domain/requests/PartnersPayload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit: number, offset: number): Promise<PartnersDetail[]> {

    const _partnerss = await Partners.fetchAll()
    const partnerss = await (_partnerss).query((qb) => {
        qb.limit(limit),
            qb.offset(offset)
    }).fetch({ withRelated: ['billingAccounts', 'additionalAddressePartners'] })

    const res = transform(partnerss.serialize(), (partners: PartnersDetail) => ({
        id: partners.id,
        name: partners.name,
        AAHpayer: partners.AAHpayer,
        accountantAAH: partners.accountantAAH,
        accountantPositionId: partners.accountantPositionId,
        anotherAdditionalInformation: partners.anotherAdditionalInformation,
        anotherCredentialsNumber: partners.anotherCredentialsNumber,
        anotherCredentialsDate: partners.anotherCredentialsNumber,
        anotherDeliveryTime: partners.anotherDeliveryTime,
        anotherFullname: partners.anotherFullname,
        // additionalAddressePartners : partners.additionalAddressePartners,
        // billingAccounts  : partners.billingAccounts,
        contract: partners.contract,
        certificateNumber: partners.certificateNumber,
        dateContract: partners.dateContract,
        email: partners.email,
        fullName: partners.fullName,
        groupId: partners.groupId,
        headAAH: partners.headAAH,
        headPositionId: partners.headPositionId,
        hvhh: partners.hvhh,
        phone: partners.phone,
        legalAddress: partners.legalAddress,
        mainPurposeOfPayment: partners.mainPurposeOfPayment,
        passportNumber: partners.passportNumber,
        percentageOfSalesDiscount: partners.percentageOfSalesDiscount,
        practicalAddress: partners.practicalAddress
    }))

    return res;
}


export async function count(): Promise<object> {
    const count = await (await Partners.fetchAll()).count();
    return { count }
}


export async function insert(param: PartnersPayload): Promise<PartnersPayload> {
    const billingAccounts = param['billingAccounts'];
    const additionalAddressePartners = param['additionalAddressePartners']

    delete param['additionalAddressePartners']
    delete param['billingAccounts'];

    const partners = (await new Partners({ ...param }).save()).serialize();
    const partnersId = partners['id'];

    for (const billingAccount of billingAccounts) {
        billingAccount['partnersId'] = partnersId;
        (await new BillingAccount({ ...billingAccount }).save()).serialize();

    }

    for (const additionalAddressePartner of additionalAddressePartners) {
        additionalAddressePartner['partnersId'] = partnersId;
        (await new AdditionalAddressePartners({ ...additionalAddressePartner }).save()).serialize();
    }

    return object.camelize(partners);

}

export async function getById(id: number): Promise<PartnersDetail> {

    const position = (await new Partners({ id: id }).fetch({ withRelated: ['billingAccounts', 'additionalAddressePartners'] }));

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<PartnersDetail> {

    const res = (await new Partners({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: PartnersPayload): Promise<PartnersDetail> {

    const billingAccounts = params['billingAccounts'];
    const additionalAddressePartners = params['additionalAddressePartners']

    delete params['additionalAddressePartners']
    delete params['billingAccounts'];

    const partnersId = id;

    for (const billingAccount of billingAccounts) {
        billingAccount['partnersId'] = partnersId;
        try {
            console.log(billingAccount);
            if (billingAccount['id'] && !billingAccount['isDeleted']) {
                (await new BillingAccount().where({ id: billingAccount['id'] }).save({ ...billingAccount }, { patch: true })).serialize();
            } else if (billingAccount['id'] && billingAccount['isDeleted']) {
                (await new BillingAccount({ id: billingAccount['id'] }).destroy()).serialize();
            } else {
                (await new BillingAccount({ ...billingAccount }).save()).serialize();
            }
        } catch (error) {
            console.log(error)
        }
    }

    for (const additionalAddressePartner of additionalAddressePartners) {
        additionalAddressePartner['partnersId'] = partnersId;
        try {
            if (additionalAddressePartner['id'] && !additionalAddressePartner['isDeleted']) {
                (await new AdditionalAddressePartners().where({ id: additionalAddressePartner['id'] }).save({ ...additionalAddressePartner }, { patch: true })).serialize();
            } else if (additionalAddressePartner['id'] && additionalAddressePartner['isDeleted']) {
                (await new AdditionalAddressePartners({ id: additionalAddressePartner['id'] }).destroy()).serialize();
            } else {
                (await new AdditionalAddressePartners({ ...additionalAddressePartner }).save()).serialize();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const partners = (
        await new Partners().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(partners);
}
