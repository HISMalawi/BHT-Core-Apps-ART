const finalList = [
    {
        "drug_id": 105,
        "short_name": "Acyclovir 200mg",
        "full_name": "Acyclovir 200mg",
        "pack_size": []
    },
    {
        "drug_id": 1044,
        "short_name": "ABC/3TC (Abacavir and Lamivudine 120/60mg tablet)",
        "full_name": "Abacavir and Lamivudine 60mg pack of 60 tablets"
    },
    {
        "drug_id": 969,
        "short_name": "ABC/3TC (Abacavir and Lamivudine 600/300mg tablet)",
        "full_name": "Abacavir sulfate 600mg / Lamivudine 300mg, tin of 30 tablets"
    },
    {
        "drug_id": 932,
        "short_name": "ATV/r (Atazanavir 300mg/Ritonavir 100mg)",
        "full_name": "Atazanavir / Ritonavir 300 / 100mg, tin of 30 tablets"
    },
    {
        "drug_id": 963,
        "short_name": "TMP/SMX (Cotrimoxazole 120mg tablet)",
        "full_name": "Cotrimoxazole 120mg, blister pack of 1000 dispersible tablets"
    },
    {
        "drug_id": 297,
        "short_name": "Cotrimoxazole (480mg tablet)",
        "full_name": "Cotrimoxazole 480mg, tin of 1000 tablets"
    },
    {
        "drug_id": 576,
        "short_name": "Cotrimoxazole (960mg)",
        "full_name": "Cotrimoxazole 960mg, blister pack of 1000 tablets"
    },
    {
        "drug_id": 976,
        "short_name": "Darunavir 600mg",
        "full_name": "Darunavir 600mg pack of 60 tablets",
    },
    {
        "drug_id": 980,
        "short_name": "Dolutegravir (10mg tablet)",
        "full_name": "Dolutegravir 10mg pack of 90 tablets",
    },
    {
        "drug_id": 982,
        "short_name": "Dolutegravir (50mg tablet)",
        "full_name": "Dolutegravir 50mg pack of 30 tablets",
    },
    {
        "drug_id": 30,
        "short_name": "EFV (Efavirenz 200mg tablet)", "full_name":
            "Efavirenz 200mg, tin of 90 tablets"
    },
    {
        "drug_id": 11,
        "short_name": "EFV (Efavirenz 600mg tablet)", "full_name":
            "Efavirenz 600mg, tin of 30 tablets"
    },
    {
        "drug_id": 978,
        "short_name": "Etravirine 100mg",
        "full_name": "Etravirine 100mg, tin of 120 tablets"
    },
    {
        "drug_id": 74,
        "short_name": "LPV/r (Lopinavir and Ritonavir 100/25mg tablet)",
        "full_name": "Lopinavir / Ritonavir 100 / 25mg, tin of 60 tablets"
    },
    {
        "drug_id": 73,
        "short_name": "LPV/r (Lopinavir and Ritonavir 200/50mg tablet)",
        "full_name": "Lopinavir / Ritonavir 200 / 50mg, tin of 120 tablets"
    },
    {
        "drug_id": 1045,
        "short_name": "Lopinavir/Ritonavir(LPV/r ), 40/10mg granules",
        "full_name": "Lopinavir/Ritonavir(LPV/r ), 40/10mg granules, pack of 120 sachets"
    },
    {
        "drug_id": 979,
        "short_name": "Lopinavir/Ritonavir(LPV/r ), 40/10mg pellets",
        "full_name": "Lopinavir/Ritonavir(LPV/r ), 40/10mg granules, pack of 120 pellets"
    },
    {
        "drug_id": 22,
        "short_name": "NVP (Nevirapine 200 mg tablet)",
        "full_name": "Nevirapine 200mg, tin of 60 tablets"
    },
    {
        "drug_id": 968,
        "short_name": "NVP (Nevirapine 50 mg tablet)",
        "full_name": "Nevirapine 50mg, tin of 60 tablets"
    },
    {
        "drug_id": 1039,
        "short_name": "Pyridoxine (25mg)",
        "full_name": "Pyridoxine (25mg)"
    },
    {
        "drug_id": 1043,
        "short_name": "Raltegravir 25mg",
        "full_name": "Raltegravir 25mg pack of 60 tablets"
    },
    {
        "drug_id": 954,
        "short_name": "Raltegravir 400mg",
        "full_name": "Raltegravir 400mg pack of 60 tablets"
    },
    {
        "drug_id": 1056,
        "short_name": "Rifapentine 150mg",
        "full_name": "Rifapentine 150mg pack of 24 tablets"
    },
    {
        "drug_id": 977,
        "short_name": "Ritonavir 100mg",
        "full_name": "Ritonavir 100mg pack of 60 tablets"
    },
    {
        "drug_id": 734,
        "short_name": "TDF/3TC (Tenofavir and Lamivudine 300/300mg tablet",
        "full_name": "Lamivudine / Tenofovir disoproxil fumarate 300 / 300mg, tin of 30 tablets"
    },
    {
        "drug_id": 735,
        "short_name": "TDF/3TC/EFV (300/300/600mg tablet)",
        "full_name": "Tenofovir disoproxil fumarate / Lamivudine / Efavirenz 300 / 300 / 600mg, tin of 30 tablets"
    },
    {
        "drug_id": 983,
        "short_name": "TDF300/3TC300/DTG50",
        "full_name": "Tenofovir Disoproxil Fumarate/Lamivudine/Dolutegravir (TDF/3TC /DTG), 300/300/50mg, pack of 90 tablets"
    },
    {
        "drug_id": 39,
        "short_name": "AZT/3TC (Zidovudine and Lamivudine 300/150mg)",
        "full_name": "Zidovudine / lamivudine 300 / 150mg, tin of 60 tablets"
    },
    {
        "drug_id": 731,
        "short_name": "AZT/3TC/NVP (300/150/200mg tablet)",
        "full_name": "Zidovudine / lamivudine /Nevirapine 300 / 150 / 200mg, tin of 60 tablets"
    },
    {
        "drug_id": 732,
        "short_name": "AZT/3TC/NVP (60/30/50mg tablet)",
        "full_name": "Zidovudine / lamivudine /Nevirapine 30 / 60 / 50mg, tin of 60 tablets"
    },
    {
        "drug_id": 736,
        "short_name": "AZT/3TC (Zidovudine and Lamivudine 60/30 tablet)",
        "full_name": "Zidovudine / lamivudine 60 / 30mg, tin of 60 tablets"
    },
]
//drugs
var drugs = {};
finalList.forEach(element => {
    drugs[element.drug_id] = {
        "short_name": element.short_name,
        "full_name": element.full_name
    }
});
var drug_short_full_name = drugs;
//drug_cms_names
var drug_cms_names = {};
finalList.forEach(element => {
    drug_cms_names[element.short_name] = element.full_name;
});
// let dmh = drg;

var drug_short_names = {};
finalList.forEach(element => {
    drug_short_names[element.full_name] = element.short_name;
});

var drugs_unformatted = Object.keys(drug_short_names);
var formatted_drugs = drugs_unformatted;
// console.log(drsn);
var drug_map_hash = {};
finalList.forEach(element => {
    drug_map_hash[element.drug_id] = element.full_name;
});
var drug_cms_packsizes  = {};
finalList.forEach(element => {
    drug_cms_packsizes[element.short_name] = 30;
});
// var drugsByName = [
//     {
//         "drug_id" : 105,
//         "short_name": "Acyclovir 200mg",
//         "full_name": "Acyclovir 200mg"
//     },
//     {
//         "drug_id" : 1044,
//         "short_name": "ABC/3TC (Abacavir and Lamivudine 120/60mg tablet)",
//         "full_name": "Abacavir and Lamivudine 60mg pack of 60 tablets"
//     },
//     {
//         "drug_id" : 969,
//         "short_name": "ABC/3TC (Abacavir and Lamivudine 600/300mg tablet)",
//         "full_name": "Abacavir sulfate 600mg / Lamivudine 300mg, tin of 30 tablets"
//     },
//      {
//         "drug_id" : 932,
//         "short_name": "ATV/r (Atazanavir 300mg/Ritonavir 100mg)",
//         "full_name": "Atazanavir / Ritonavir 300 / 100mg, tin of 30 tablets"
//     },
//     {
//         "drug_id" : 963,
//         "short_name": "TMP/SMX (Cotrimoxazole 120mg tablet)",
//         "full_name": "Cotrimoxazole 120mg, blister pack of 1000 dispersible tablets"
//     },
//     {
//         "drug_id" : 297,
//         "short_name": "Cotrimoxazole (480mg tablet)",
//         "full_name": "Cotrimoxazole 480mg, tin of 1000 tablets"
//     },
//      {
//         "drug_id" : 576,
//         "short_name": "Cotrimoxazole (960mg)",
//         "full_name": "Cotrimoxazole 960mg, blister pack of 1000 tablets"
//     },
//     {
//         "drug_id" : 976,
//         "short_name": "Darunavir 600mg",
//         "full_name": "Darunavir 600mg pack of 60 tablets",
//     },
//     {
//         "drug_id" : 980,
//         "short_name": "Dolutegravir (10mg tablet)",
//         "full_name": "Dolutegravir 10mg pack of 90 tablets",
//     },
//     {
//         "drug_id" : 982,
//         "short_name": "Dolutegravir (50mg tablet)",
//         "full_name": "Dolutegravir 50mg pack of 30 tablets",
//     },
//     {
//         "drug_id" : 30,
//         "short_name": "EFV (Efavirenz 200mg tablet)", "full_name": 
//         "Efavirenz 200mg, tin of 90 tablets" 
//     },
//      {
//         "drug_id" : 11,
//         "short_name": "EFV (Efavirenz 600mg tablet)", "full_name": 
//         "Efavirenz 600mg, tin of 30 tablets" 
//     },
//     {
//         "drug_id" : 978,
//         "short_name": "Etravirine 100mg", 
//         "full_name": "Etravirine 100mg, tin of 120 tablets" 
//     },
//     {
//         "drug_id" : 74,
//         "short_name": "LPV/r (Lopinavir and Ritonavir 100/25mg tablet)",
//         "full_name": "Lopinavir / Ritonavir 100 / 25mg, tin of 60 tablets"
//     },
//     {
//         "drug_id" : 73,
//         "short_name": "LPV/r (Lopinavir and Ritonavir 200/50mg tablet)",
//         "full_name": "Lopinavir / Ritonavir 200 / 50mg, tin of 120 tablets"
//     },
//     {
//         "drug_id" : 1045,
//         "short_name": "Lopinavir/Ritonavir(LPV/r ), 40/10mg granules",
//         "full_name": "Lopinavir/Ritonavir(LPV/r ), 40/10mg granules, pack of 120 sachets"
//     },    
//     {
//         "drug_id" : 979,
//         "short_name": "Lopinavir/Ritonavir(LPV/r ), 40/10mg pellets",
//         "full_name": "Lopinavir/Ritonavir(LPV/r ), 40/10mg granules, pack of 120 pellets"
//     },
//     {
//         "drug_id" : 22,
//          "short_name": "NVP (Nevirapine 200 mg tablet)", 
//          "full_name": "Nevirapine 200mg, tin of 60 tablets" },
//     {
//         "drug_id" : 968,
//          "short_name": "NVP (Nevirapine 50 mg tablet)", 
//          "full_name": "Nevirapine 50mg, tin of 60 tablets" 
//     },
//     {
//         "drug_id" : 1039,
//         "short_name": "Pyridoxine (25mg)",
//         "full_name": "Pyridoxine (25mg)"
//     },
//     {
//         "drug_id" : 1043,
//         "short_name": "Raltegravir 25mg",
//         "full_name": "Raltegravir 25mg pack of 60 tablets"
//     },
//     {
//         "drug_id" : 954,
//         "short_name": "Raltegravir 400mg",
//         "full_name": "Raltegravir 400mg pack of 60 tablets"
//     },
//     {
//         "drug_id" : 1056,
//         "short_name": "Rifapentine 150mg",
//         "full_name": "Rifapentine 150mg pack of 24 tablets"
//     },
//     {
//         "drug_id" : 977,
//         "short_name": "Ritonavir 100mg",
//         "full_name": "Ritonavir 100mg pack of 60 tablets"
//     },
//     {
//         "drug_id" : 734,
//         "short_name": "TDF/3TC (Tenofavir and Lamivudine 300/300mg tablet",
//         "full_name": "Lamivudine / Tenofovir disoproxil fumarate 300 / 300mg, tin of 30 tablets"
//     },
//     {
//         "drug_id" : 735,
//         "short_name": "TDF/3TC/EFV (300/300/600mg tablet)",
//         "full_name": "Tenofovir disoproxil fumarate / Lamivudine / Efavirenz 300 / 300 / 600mg, tin of 30 tablets"
//     },
//     {
//         "drug_id" : 983,
//         "short_name": "TDF300/3TC300/DTG50",
//         "full_name": "Tenofovir Disoproxil Fumarate/Lamivudine/Dolutegravir (TDF/3TC /DTG), 300/300/50mg, pack of 90 tablets"
//     },
//     {
//         "drug_id" : 39,
//         "short_name": "AZT/3TC (Zidovudine and Lamivudine 300/150mg)",
//         "full_name": "Zidovudine / lamivudine 300 / 150mg, tin of 60 tablets"
//     },
//     {
//         "drug_id" : 731,
//         "short_name": "AZT/3TC/NVP (300/150/200mg tablet)",
//         "full_name": "Zidovudine / lamivudine /Nevirapine 300 / 150 / 200mg, tin of 60 tablets"
//     },
//     {
//         "drug_id" : 732,
//         "short_name": "AZT/3TC/NVP (60/30/50mg tablet)",
//         "full_name": "Zidovudine / lamivudine /Nevirapine 30 / 60 / 50mg, tin of 60 tablets"
//     },
//     {
//         "drug_id" : 736,
//         "short_name": "AZT/3TC (Zidovudine and Lamivudine 60/30 tablet)",
//         "full_name": "Zidovudine / lamivudine 60 / 30mg, tin of 60 tablets"
//     },
// ];
//key is derived from drug_name ie drug table while value is derived from alternate drug name / name 


//uses drug name from drug table
// var drug_cms_packsizes = {
//     "Cotrimoxazole (960mg)": 1000,
//     "Cotrimoxazole (480mg tablet)": 1000,
//     "INH or H (Isoniazid 100mg tablet)": 100,
//     "LPV/r (Lopinavir and Ritonavir 100/25mg tablet)": 60,
//     "TMP/SMX (Cotrimoxazole 120mg tablet)": 1000,
//     "AZT/3TC/NVP (300/150/200mg tablet)": 60,
//     "LPV/r (Lopinavir and Ritonavir 200/50mg tablet)": 120,
//     "AZT/3TC (Zidovudine and Lamivudine 300/150mg)": 60,
//     "EFV (Efavirenz 600mg tablet)": 30,
//     "TDF/3TC/EFV (300/300/600mg tablet)": 30,
//     "TDF/3TC (Tenofavir and Lamivudine 300/300mg tablet": 30,
//     "ABC/3TC (Abacavir and Lamivudine 600/300mg tablet)": 30,
//     "NVP (Nevirapine 50 mg tablet)": 60,
//     "INH or H (Isoniazid 300mg tablet)": 1000,
//     "NVP (Nevirapine syrup 1.5mL/dose in 25mL bottle)": 25,
//     "NVP (Nevirapine syrup 1mL/dose in 100mL bottle)": 100,
//     "ATV/r (Atazanavir 300mg/Ritonavir 100mg)": 30,
//     "AZT/3TC/NVP (60/30/50mg tablet)": 60,
//     "AZT/3TC (Zidovudine and Lamivudine 60/30 tablet)": 60,
//     "d4T/3TC/NVP (30/150/200mg tablet)": 60,
//     "EFV (Efavirenz 200mg tablet)": 90,
//     "NVP (Nevirapine 200 mg tablet)": 60,
//     "d4T/3TC (Stavudine Lamivudine 30/150 tablet)": 60,
//     "ABC/3TC (Abacavir and Lamivudine 60/30mg tablet)": 60,
//     "Pyridoxine (50mg)": 1000,
//     "ABC/3TC (Abacavir and Lamivudine 120/60mg tablet)": 60,
//     "Raltegravir 25mg": 60,
//     "Raltegravir 400mg": 60,
//     "Darunavir 600mg": 60,
//     "Dolutegravir (50mg tablet)": 30,
//     "Rifapentine 150mg": 24,
//     "TDF300/3TC300/DTG50": 30,
//     "Pyridoxine (25mg)": 1000,
//     "Ritonavir 100mg": 30,
// };





// var drug_short_full_name = {
//     "733": {
//         "short_name": "ABC/3TC (Abacavir and Lamivudine 60/30mg tablet)",
//         "full_name": "Abacavir / Lamivudine 60 / 30mg, tin of 60 tablets"
//     },
//     "969": {
//         "short_name": "ABC/3TC (Abacavir and Lamivudine 600/300mg tablet)",
//         "full_name": "Abacavir sulfate 600mg / Lamivudine 300mg, tin of 30 tablets"
//     },
//     "932": {
//         "short_name": "ATV/r (Atazanavir 300mg/Ritonavir 100mg)",
//         "full_name": "Atazanavir / Ritonavir 300 / 100mg, tin of 30 tablets"
//     },
//     "963": {
//         "short_name": "TMP/SMX (Cotrimoxazole 120mg tablet)",
//         "full_name": "Cotrimoxazole 120mg, blister pack of 1000 dispersible tablets"
//     },
//     "297": {
//         "short_name": "Cotrimoxazole (480mg tablet)",
//         "full_name": "Cotrimoxazole 480mg, tin of 1000 tablets"
//     },
//     "576": {
//         "short_name": "Cotrimoxazole (960mg)",
//         "full_name": "Cotrimoxazole 960mg, blister pack of 1000 tablets"
//     },
//     "30": { "short_name": "EFV (Efavirenz 200mg tablet)", "full_name": "Efavirenz 200mg, tin of 90 tablets" },
//     "11": { "short_name": "EFV (Efavirenz 600mg tablet)", "full_name": "Efavirenz 600mg, tin of 30 tablets" },
//     "24": {
//         "short_name": "INH or H (Isoniazid 100mg tablet)",
//         "full_name": "Isoniazid 100mg, tin of 100 tablets"
//     },
//     "931": {
//         "short_name": "INH or H (Isoniazid 300mg tablet)",
//         "full_name": "Isoniazid 300mg, tin of 1000 tablets"
//     },
//     "613": {
//         "short_name": "d4T/3TC/NVP (30/150/200mg tablet)",
//         "full_name": "Lamivudine / Stavudine / Nevirapine 150 / 30 / 200mg, tin of 60 tablets"
//     },
//     "734": {
//         "short_name": "TDF/3TC (Tenofavir and Lamivudine 300/300mg tablet",
//         "full_name": "Lamivudine / Tenofovir disoproxil fumarate 300 / 300mg, tin of 30 tablets"
//     },
//     "74": {
//         "short_name": "LPV/r (Lopinavir and Ritonavir 100/25mg tablet)",
//         "full_name": "Lopinavir / Ritonavir 100 / 25mg, tin of 60 tablets"
//     },
//     "73": {
//         "short_name": "LPV/r (Lopinavir and Ritonavir 200/50mg tablet)",
//         "full_name": "Lopinavir / Ritonavir 200 / 50mg, tin of 120 tablets"
//     },
//     "971": {
//         "short_name": "NVP (Nevirapine syrup 1mL/dose in 100mL bottle)",
//         "full_name": "Nevirapine 10mg/ml,100ml"
//     },
//     "21": {
//         "short_name": "NVP (Nevirapine syrup 1.5mL/dose in 25mL bottle)",
//         "full_name": "Nevirapine 10mg/ml, 25ml"
//     },
//     "22": { "short_name": "NVP (Nevirapine 200 mg tablet)", "full_name": "Nevirapine 200mg, tin of 60 tablets" },
//     "968": { "short_name": "NVP (Nevirapine 50 mg tablet)", "full_name": "Nevirapine 50mg, tin of 60 tablets" },
//     "76": { "short_name": "Pyridoxine (50mg)", "full_name": "Pyridoxine 50mg tab, 1000 tablets" },
//     "738": {
//         "short_name": "d4T/3TC (Stavudine Lamivudine 30/150 tablet)",
//         "full_name": "Stavudine / lamivudine 30 / 150mg, tin of 60 tablets"
//     },
//     "735": {
//         "short_name": "TDF/3TC/EFV (300/300/600mg tablet)",
//         "full_name": "Tenofovir disoproxil fumarate / Lamivudine / Efavirenz 300 / 300 / 600mg, tin of 30 tablets"
//     },
//     "732": {
//         "short_name": "AZT/3TC/NVP (60/30/50mg tablet)",
//         "full_name": "Zidovudine / lamivudine /Nevirapine 30 / 60 / 50mg, tin of 60 tablets"
//     },
//     "731": {
//         "short_name": "AZT/3TC/NVP (300/150/200mg tablet)",
//         "full_name": "Zidovudine / lamivudine /Nevirapine 300 / 150 / 200mg, tin of 60 tablets"
//     },
//     "39": {
//         "short_name": "AZT/3TC (Zidovudine and Lamivudine 300/150mg)",
//         "full_name": "Zidovudine / lamivudine 300 / 150mg, tin of 60 tablets"
//     },
//     "736": {
//         "short_name": "AZT/3TC (Zidovudine and Lamivudine 60/30 tablet)",
//         "full_name": "Cotrimoxazole 120mg, blister pack of 1000 dispersible tablets"
//     },
//     "1044":
//     {
//         "short_name": "ABC/3TC (Abacavir and Lamivudine 120/60mg tablet)",
//         "full_name": "Abacavir and Lamivudine 60mg pack of 60 tablets"
//     },
//     "1043":
//     {
//         "short_name": "Raltegravir 25mg",
//         "full_name": "Raltegravir 25mg pack of 60 tablets"
//     },
//     "1056": {
//         "short_name": "Rifapentine 150mg",
//         "full_name": "Rifapentine 150mg pack of 24 tablets"
//     },
//     "954": {
//         "short_name": "Raltegravir 400mg",
//         "full_name": "Raltegravir 400mg pack of 60 tablets"
//     },
//     "976": {
//         "short_name": "Darunavir 600mg",
//         "full_name": "Darunavir 600mg pack of 60 tablets",
//     },
//     "982": {
//         "short_name": "Dolutegravir (50mg tablet)",
//         "full_name": "Dolutegravir 50mg pack of 30 tablets",
//     },
//     "983": {
//         "short_name": "TDF300/3TC300/DTG50",
//         "full_name": "TDF300/3TC300/DTG50"
//     },
//     "1039": {
//         "short_name": "Pyridoxine (25mg)",
//         "full_name": "Pyridoxine (25mg)"
//     },
//     "977": {
//         "short_name": "Ritonavir 100mg",
//         "full_name": "Ritonavir 100mg"
//     },
//     "978": {
//         "short_name": "Etravine 100mg",
//         "full_name": "Etravine 100mg"
//     },
// }

//full_name as key and short name as value

//(id, : ["full_name, full_name, tabs, 0, strength"])
var drug_weights = {
    "16": ["Lamivudine / Tenofovir disoproxil fumarate 300 / 300mg, tin of 30 tablets", "TDF/3TC (Tenofavir and Lamivudine 300/300mg tablet", "TDF / 3TC ", "30 tabs", 30, 0, "300 / 300mg"],
    "5": ["Zidovudine / lamivudine /Nevirapine 30 / 60 / 50mg, tin of 60 tablets", "AZT/3TC/NVP (60/30/50mg tablet)", "AZT / 3TC / NVP", "60 tabs", 60, 0, "60 / 30 /50mg"],
    "11": ["Lopinavir / Ritonavir 100 / 25mg, tin of 60 tablets", "LPV/r (Lopinavir and Ritonavir 100/25mg tablet)", "LPV / r ", "60 tabs", 60, 0, "100 / 25mg"],
    "17": ["Tenofovir disoproxil fumarate / Lamivudine / Efavirenz 300 / 300 / 600mg, tin of 30 tablets", "TDF/3TC/EFV (300/300/600mg tablet)", "TDF / 3TC / EFV ", "30 tabs", 30, 0, "300 / 300 / 600mg"],
    "6": ["Zidovudine / lamivudine /Nevirapine 300 / 150 / 200mg, tin of 60 tablets", "AZT/3TC/NVP (300/150/200mg tablet)", "AZT / 3TC / NVP", "60 tabs", 60, 0, "300 / 150 / 200mg"],
    "23": ["Cotrimoxazole 120mg, blister pack of 1000 dispersible tablets", "TMP/SMX (Cotrimoxazole 120mg tablet)", "Cotrimoxazole", "1000 tabs", 1000, 0, "100 / 20mg"],
    "1": ["Abacavir / Lamivudine 60 / 30mg, tin of 60 tablets", "ABC/3TC (Abacavir and Lamivudine 60/30mg tablet)", "ABC / 3TC", "60 tabs", 60, 0, "60 / 30mg"],
    "12": ["Lopinavir / Ritonavir 200 / 50mg, tin of 120 tablets", "LPV/r (Lopinavir and Ritonavir 200/50mg tablet)", "LPV / r ", "120 tabs", 120, 0, "200 / 50mg"],
    "7": ["Stavudine / lamivudine 30 / 150mg, tin of 60 tablets", "d4T/3TC (Stavudine Lamivudine 30/150 tablet)", "d4T/3TC", "60 tabs", 60, 0, "30 / 150mg"],
    "18": ["Nevirapine 10mg/ml, 25ml", "NVP (Nevirapine syrup 1.5mL/dose in 25mL bottle)", "NVP", "25ml", 25, 0, "10mg/ml"],
    "2": ["Abacavir sulfate 600mg / Lamivudine 300mg, tin of 30 tablets", "ABC/3TC (Abacavir and Lamivudine 600/300mg tablet)", "ABC / 3TC", "30 tabs", 30, 0, "600 / 300mg"],
    "13": ["Atazanavir / Ritonavir 300 / 100mg, tin of 30 tablets", "ATV/r (Atazanavir 300mg/Ritonavir 100mg)", "ATV / r ", "30 tabs", 30, 0, "300 / 100mg"],
    "24": ["Cotrimoxazole 480mg, tin of 1000 tablets", "Cotrimoxazole (480mg tablet)", "Cotrimoxazole", "1000 tabs", 1000, 0, "400 / 80mg"],
    "19": ["Nevirapine 10mg/ml, 100ml", "NVP (Nevirapine syrup 1mL/dose in 100mL bottle)", "NVP", "100ml", 100, 0, "10mg/ml"],
    "8": ["Lamivudine / Stavudine / Nevirapine 150 / 30 / 200mg, tin of 60 tablets", "d4T/3TC/NVP (30/150/200mg tablet)", "d4T/3TC/NVP", "60 tabs", 60, 0, "30 / 150 / 200mg"],
    "14": ["Nevirapine 50mg, tin of 60 tablets", "NVP (Nevirapine 50 mg tablet)", "NVP", "60 tabs", 60, 0, "50mg"],
    "3": ["Zidovudine / lamivudine 60 / 30mg, tin of 60 tablets", "AZT/3TC (Zidovudine and Lamivudine 60/30 tablet)", "AZT / 3TC", "60 tabs", 60, 0, "60 / 30mg"],
    "25": ["Cotrimoxazole 960mg, blister pack of 1000 tablets", "Cotrimoxazole (960mg)", "Cotrimoxazole", "1000 tabs", 1000, 0, "960mg"],
    "9": ["Efavirenz 200mg, tin of 90 tablets", "EFV (Efavirenz 200mg tablet)", "EFV", "90 tabs", 90, 0, "200mg"],
    "20": ["Isoniazid 100mg, tin of 100 tablets", "INH or H (Isoniazid 100mg tablet)", "Isoniazid (H) ", "100 tabs", 100, 0, "100mg"],
    "26": ["Pyridoxine 50mg tab, 1000 tablets", "Pyridoxine (50mg)", "Pyridoxine", "1000 tabs", 1000, 0, "50mg"],
    "4": ["Zidovudine / lamivudine 300 / 150mg, tin of 60 tablets", "AZT/3TC (Zidovudine and Lamivudine 300/150mg)", "AZT / 3TC", "60 tabs", 60, 0, "300 / 150mg"],
    "15": ["Nevirapine 200mg, tin of 60 tablets", "NVP (Nevirapine 200 mg tablet)", "NVP", "60 tabs", 60, 0, "200mg"],
    "21": ["Isoniazid 300mg, tin of 1000 tablets", "INH or H (Isoniazid 300mg tablet)", "Isoniazid (H) ", "1000 tabs", 1000, 0, "300mg"],
    // "26": ["ABC / 3TC 120 / 60mg 60 tabs", "ABC/3TC (Abacavir and Lamivudine 120/60mg tablet)", "ABC", "60 tabs", 60, 0, "600mg"],
    "27": ["Raltegravir 25mg, 60 tablets", "Raltegravir 25mg", "RAL", "60 tabs", 60, 0, "25mg"],
    "28": ["Raltegravir 400mg, 60 tablets", "Raltegravir 400mg", "RAL", "60 tabs", 60, 0, "400mg"],
    "29": ["Darunavir 600mg, 60 tablets", "Darunavir 600mg", "DRV", "60 tabs", 60, 0, "600mg"],
    "30": ["Dolutegravir 50mg 30 tablets", "Dolutegravir (50mg tablet)", "DTG", "30 tabs", 30, 0, "50mg"],
    "31": ["TDF300/3TC300/DTG50", "TDF300/3TC300/DTG50", "TDF300/3TC300/DTG50", "30 tabs", 30, 0, "300/300/50mg"],
    "32": ["Pyridoxine (25mg)", "Pyridoxine (25mg)", "Pyridoxine (25mg)", "1000 tabs", 1000, 0, "25mg"],
    "33": ["Ritonavir 100mg", "Ritonavir 100mg", "Ritonavir 100mg", "30 tabs", 30, 0, "100mg"],
};


var adults_drugs_hash = {
    "976": "Darunavir 600mg",
    "977": "Ritonavir 100mg",
    "978": "Etravirine 100mg",
    "954": "Raltegravir 400mg",
    "22": "NVP (Nevirapine 200 mg tablet)",
    "969": "ABC/3TC (Abacavir and Lamivudine 600/300mg tablet)",
    "731": "AZT/3TC/NVP (300/150/200mg tablet)",
    "39": "AZT/3TC (Zidovudine and Lamivudine 300/150mg)",
    "11": "EFV (Efavirenz 600mg tablet)",
    "735": "TDF/3TC/EFV (300/300/600mg tablet)",
    "734": "TDF/3TC (Tenofavir and Lamivudine 300/300mg tablet",
    "932": "ATV/r (Atazanavir 300mg/Ritonavir 100mg)",
    "73": "LPV/r (Lopinavir and Ritonavir 200/50mg tablet)",
    "576": "Cotrimoxazole (960mg)",
    "297": "Cotrimoxazole (480mg tablet)",
    "931": "INH or H (Isoniazid 300mg tablet)",
    // "954": "Raltegravir 400mg",
    "1056": "Rifapentine 150mg",
    // "976": "Darunavir 600mg",
    "982": "Dolutegravir (50mg tablet)",
    "983":  "TDF300/3TC300/DTG50",
    "1039":  "Pyridoxine (25mg)",
    // "977":  "Ritonavir 100mg",
};

var paedsDrugsHash = {
    "733": "Abacavir / Lamivudine 60 / 30mg, tin of 60 tablets",
    "968": "Nevirapine 50mg, tin of 60 tablets",
    "732": "Zidovudine / lamivudine /Nevirapine 30 / 60 / 50mg, tin of 60 tablets",
    "736": "Zidovudine / lamivudine 60 / 30mg, tin of 60 tablets",
    "30": "Efavirenz 200mg, tin of 90 tablets",
    "74": "Lopinavir / Ritonavir 100 / 25mg, tin of 60 tablets",
    "979": "LPV/r pellets",
    "963": "Cotrimoxazole 120mg, blister pack of 1000 dispersible tablets",
    "24": "Isoniazid 100mg, tin of 100 tablets",
    "1044": "ABC/3TC (Abacavir and Lamivudine 120/60mg tablet)",
    "1043": "Raltegravir 25mg",
};