// To parse this data:
//
//   import { Convert, Patient } from "./file";
//
//   const patient = Convert.toPatient(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Patient {
    patientID:          number;
    tribe:              null;
    creator:            number;
    dateCreated:        Date;
    changedBy:          number;
    dateChanged:        Date;
    voided:             number;
    voidedBy:           null;
    dateVoided:         null;
    voidReason:         null;
    person:             Person;
    patientIdentifiers: PatientIdentifier[];
}

export interface PatientIdentifier {
    patientIdentifierID: number;
    patientID:           number;
    identifier:          string;
    identifierType:      number;
    preferred:           number;
    locationID:          number;
    creator:             number;
    dateCreated:         Date;
    voided:              number;
    voidedBy:            null;
    dateVoided:          null;
    voidReason:          null;
    uuid:                string;
    type:                PatientIdentifierType;
}

export interface PatientIdentifierType {
    patientIdentifierTypeID: number;
    name:                    string;
    description:             string;
    format:                  string;
    checkDigit:              number;
    creator:                 number;
    dateCreated:             Date;
    required:                number;
    formatDescription:       string;
    validator:               null;
    retired:                 number;
    retiredBy:               null;
    dateRetired:             null;
    retireReason:            null;
    uuid:                    string;
}

export interface Person {
    personID:           number;
    gender:             string;
    birthdate:          Date;
    birthdateEstimated: number;
    dead:               number;
    deathDate:          null;
    causeOfDeath:       null;
    creator:            number;
    dateCreated:        Date;
    changedBy:          number;
    dateChanged:        Date;
    voided:             number;
    voidedBy:           null;
    dateVoided:         null;
    voidReason:         null;
    uuid:               string;
    names:              Name[];
    addresses:          Address[];
    personAttributes:   PersonAttribute[];
}

export interface Address {
    personAddressID:  number;
    personID:         number;
    preferred:        number;
    address1:         null;
    address2:         string;
    cityVillage:      string;
    stateProvince:    string;
    postalCode:       null;
    country:          null;
    latitude:         null;
    longitude:        null;
    creator:          number;
    dateCreated:      Date;
    voided:           number;
    voidedBy:         null;
    dateVoided:       null;
    voidReason:       null;
    countyDistrict:   string;
    neighborhoodCell: string;
    region:           null;
    subregion:        null;
    townshipDivision: string;
    uuid:             string;
}

export interface Name {
    personNameID:     number;
    preferred:        number;
    personID:         number;
    prefix:           null;
    givenName:        string;
    middleName:       string;
    familyNamePrefix: null;
    familyName:       string;
    familyName2:      null;
    familyNameSuffix: null;
    degree:           null;
    creator:          number;
    dateCreated:      Date;
    voided:           number;
    voidedBy:         null;
    dateVoided:       null;
    voidReason:       null;
    changedBy:        null;
    dateChanged:      null;
    uuid:             string;
}

export interface PersonAttribute {
    personAttributeID:     number;
    personID:              number;
    value:                 string;
    personAttributeTypeID: number;
    creator:               number;
    dateCreated:           Date;
    changedBy:             number;
    dateChanged:           Date;
    voided:                number;
    voidedBy:              null;
    dateVoided:            null;
    voidReason:            null;
    uuid:                  string;
    type:                  PersonAttributeType;
}

export interface PersonAttributeType {
    personAttributeTypeID: number;
    name:                  string;
    description:           string;
    format:                string;
    foreignKey:            null;
    searchable:            number;
    creator:               number;
    dateCreated:           Date;
    changedBy:             number | null;
    dateChanged:           Date | null;
    retired:               number;
    retiredBy:             null;
    dateRetired:           null;
    retireReason:          null;
    editPrivilege:         null;
    uuid:                  string;
    sortWeight:            number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toPatient(json: string): Patient {
        return cast(JSON.parse(json), r("Patient"));
    }

    public static patientToJson(value: Patient): string {
        return JSON.stringify(uncast(value, r("Patient")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Patient": o([
        { json: "patient_id", js: "patientID", typ: 0 },
        { json: "tribe", js: "tribe", typ: null },
        { json: "creator", js: "creator", typ: 0 },
        { json: "date_created", js: "dateCreated", typ: Date },
        { json: "changed_by", js: "changedBy", typ: 0 },
        { json: "date_changed", js: "dateChanged", typ: Date },
        { json: "voided", js: "voided", typ: 0 },
        { json: "voided_by", js: "voidedBy", typ: null },
        { json: "date_voided", js: "dateVoided", typ: null },
        { json: "void_reason", js: "voidReason", typ: null },
        { json: "person", js: "person", typ: r("Person") },
        { json: "patient_identifiers", js: "patientIdentifiers", typ: a(r("PatientIdentifier")) },
    ], false),
    "PatientIdentifier": o([
        { json: "patient_identifier_id", js: "patientIdentifierID", typ: 0 },
        { json: "patient_id", js: "patientID", typ: 0 },
        { json: "identifier", js: "identifier", typ: "" },
        { json: "identifier_type", js: "identifierType", typ: 0 },
        { json: "preferred", js: "preferred", typ: 0 },
        { json: "location_id", js: "locationID", typ: 0 },
        { json: "creator", js: "creator", typ: 0 },
        { json: "date_created", js: "dateCreated", typ: Date },
        { json: "voided", js: "voided", typ: 0 },
        { json: "voided_by", js: "voidedBy", typ: null },
        { json: "date_voided", js: "dateVoided", typ: null },
        { json: "void_reason", js: "voidReason", typ: null },
        { json: "uuid", js: "uuid", typ: "" },
        { json: "type", js: "type", typ: r("PatientIdentifierType") },
    ], false),
    "PatientIdentifierType": o([
        { json: "patient_identifier_type_id", js: "patientIdentifierTypeID", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "format", js: "format", typ: "" },
        { json: "check_digit", js: "checkDigit", typ: 0 },
        { json: "creator", js: "creator", typ: 0 },
        { json: "date_created", js: "dateCreated", typ: Date },
        { json: "required", js: "required", typ: 0 },
        { json: "format_description", js: "formatDescription", typ: "" },
        { json: "validator", js: "validator", typ: null },
        { json: "retired", js: "retired", typ: 0 },
        { json: "retired_by", js: "retiredBy", typ: null },
        { json: "date_retired", js: "dateRetired", typ: null },
        { json: "retire_reason", js: "retireReason", typ: null },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "Person": o([
        { json: "person_id", js: "personID", typ: 0 },
        { json: "gender", js: "gender", typ: "" },
        { json: "birthdate", js: "birthdate", typ: Date },
        { json: "birthdate_estimated", js: "birthdateEstimated", typ: 0 },
        { json: "dead", js: "dead", typ: 0 },
        { json: "death_date", js: "deathDate", typ: null },
        { json: "cause_of_death", js: "causeOfDeath", typ: null },
        { json: "creator", js: "creator", typ: 0 },
        { json: "date_created", js: "dateCreated", typ: Date },
        { json: "changed_by", js: "changedBy", typ: 0 },
        { json: "date_changed", js: "dateChanged", typ: Date },
        { json: "voided", js: "voided", typ: 0 },
        { json: "voided_by", js: "voidedBy", typ: null },
        { json: "date_voided", js: "dateVoided", typ: null },
        { json: "void_reason", js: "voidReason", typ: null },
        { json: "uuid", js: "uuid", typ: "" },
        { json: "names", js: "names", typ: a(r("Name")) },
        { json: "addresses", js: "addresses", typ: a(r("Address")) },
        { json: "person_attributes", js: "personAttributes", typ: a(r("PersonAttribute")) },
    ], false),
    "Address": o([
        { json: "person_address_id", js: "personAddressID", typ: 0 },
        { json: "person_id", js: "personID", typ: 0 },
        { json: "preferred", js: "preferred", typ: 0 },
        { json: "address1", js: "address1", typ: null },
        { json: "address2", js: "address2", typ: "" },
        { json: "city_village", js: "cityVillage", typ: "" },
        { json: "state_province", js: "stateProvince", typ: "" },
        { json: "postal_code", js: "postalCode", typ: null },
        { json: "country", js: "country", typ: null },
        { json: "latitude", js: "latitude", typ: null },
        { json: "longitude", js: "longitude", typ: null },
        { json: "creator", js: "creator", typ: 0 },
        { json: "date_created", js: "dateCreated", typ: Date },
        { json: "voided", js: "voided", typ: 0 },
        { json: "voided_by", js: "voidedBy", typ: null },
        { json: "date_voided", js: "dateVoided", typ: null },
        { json: "void_reason", js: "voidReason", typ: null },
        { json: "county_district", js: "countyDistrict", typ: "" },
        { json: "neighborhood_cell", js: "neighborhoodCell", typ: "" },
        { json: "region", js: "region", typ: null },
        { json: "subregion", js: "subregion", typ: null },
        { json: "township_division", js: "townshipDivision", typ: "" },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "Name": o([
        { json: "person_name_id", js: "personNameID", typ: 0 },
        { json: "preferred", js: "preferred", typ: 0 },
        { json: "person_id", js: "personID", typ: 0 },
        { json: "prefix", js: "prefix", typ: null },
        { json: "given_name", js: "givenName", typ: "" },
        { json: "middle_name", js: "middleName", typ: "" },
        { json: "family_name_prefix", js: "familyNamePrefix", typ: null },
        { json: "family_name", js: "familyName", typ: "" },
        { json: "family_name2", js: "familyName2", typ: null },
        { json: "family_name_suffix", js: "familyNameSuffix", typ: null },
        { json: "degree", js: "degree", typ: null },
        { json: "creator", js: "creator", typ: 0 },
        { json: "date_created", js: "dateCreated", typ: Date },
        { json: "voided", js: "voided", typ: 0 },
        { json: "voided_by", js: "voidedBy", typ: null },
        { json: "date_voided", js: "dateVoided", typ: null },
        { json: "void_reason", js: "voidReason", typ: null },
        { json: "changed_by", js: "changedBy", typ: null },
        { json: "date_changed", js: "dateChanged", typ: null },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "PersonAttribute": o([
        { json: "person_attribute_id", js: "personAttributeID", typ: 0 },
        { json: "person_id", js: "personID", typ: 0 },
        { json: "value", js: "value", typ: "" },
        { json: "person_attribute_type_id", js: "personAttributeTypeID", typ: 0 },
        { json: "creator", js: "creator", typ: 0 },
        { json: "date_created", js: "dateCreated", typ: Date },
        { json: "changed_by", js: "changedBy", typ: 0 },
        { json: "date_changed", js: "dateChanged", typ: Date },
        { json: "voided", js: "voided", typ: 0 },
        { json: "voided_by", js: "voidedBy", typ: null },
        { json: "date_voided", js: "dateVoided", typ: null },
        { json: "void_reason", js: "voidReason", typ: null },
        { json: "uuid", js: "uuid", typ: "" },
        { json: "type", js: "type", typ: r("PersonAttributeType") },
    ], false),
    "PersonAttributeType": o([
        { json: "person_attribute_type_id", js: "personAttributeTypeID", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "format", js: "format", typ: "" },
        { json: "foreign_key", js: "foreignKey", typ: null },
        { json: "searchable", js: "searchable", typ: 0 },
        { json: "creator", js: "creator", typ: 0 },
        { json: "date_created", js: "dateCreated", typ: Date },
        { json: "changed_by", js: "changedBy", typ: u(0, null) },
        { json: "date_changed", js: "dateChanged", typ: u(Date, null) },
        { json: "retired", js: "retired", typ: 0 },
        { json: "retired_by", js: "retiredBy", typ: null },
        { json: "date_retired", js: "dateRetired", typ: null },
        { json: "retire_reason", js: "retireReason", typ: null },
        { json: "edit_privilege", js: "editPrivilege", typ: null },
        { json: "uuid", js: "uuid", typ: "" },
        { json: "sort_weight", js: "sortWeight", typ: 0 },
    ], false),
};
