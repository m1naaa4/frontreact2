const countries = [
  {
    "value": "AF",
    "label": "Afghanistan"
  },
  {
    "value": "AX",
    "label": "åland_Islands"
  },
  {
    "value": "AL",
    "label": "albania"
  },
  {
    "value": "DZ",
    "label": "algeria"
  },
  {
    "value": "AS",
    "label": "american_samoa"
  },
  {
    "value": "AD",
    "label": "andorra"
  },
  {
    "value": "AO",
    "label": "angola"
  },
  {
    "value": "AI",
    "label": "anguilla"
  },
  {
    "value": "AQ",
    "label": "antarctica"
  },
  {
    "value": "AG",
    "label": "antigua_and_barbuda"
  },
  {
    "value": "AR",
    "label": "argentina"
  },
  {
    "value": "AM",
    "label": "armenia"
  },
  {
    "value": "AW",
    "label": "aruba"
  },
  {
    "value": "AU",
    "label": "australia"
  },
  {
    "value": "AT",
    "label": "austria"
  },
  {
    "value": "AZ",
    "label": "azerbaijan"
  },
  {
    "value": "BS",
    "label": "bahamas"
  },
  {
    "value": "BH",
    "label": "bahrain"
  },
  {
    "value": "BD",
    "label": "bangladesh"
  },
  {
    "value": "BB",
    "label": "barbados"
  },
  {
    "value": "BY",
    "label": "belarus"
  },
  {
    "value": "BE",
    "label": "belgium"
  },
  {
    "value": "BZ",
    "label": "belize"
  },
  {
    "value": "BJ",
    "label": "benin"
  },
  {
    "value": "BM",
    "label": "bermuda"
  },
  {
    "value": "BT",
    "label": "bhutan"
  },
  {
    "value": "BO",
    "label": "bolivia"
  },
  {
    "value": "BQ",
    "label": "bonaire"
  },
  {
    "value": "BA",
    "label": "bosnia"
  },
  {
    "value": "BW",
    "label": "botswana"
  },
  {
    "value": "BV",
    "label": "bouvet_Island"
  },
  {
    "value": "BR",
    "label": "brazil"
  },
  {
    "value": "IO",
    "label": "british_Indian_Ocean_Territory"
  },
  {
    "value": "BN",
    "label": "brunei_Darussalam"
  },
  {
    "value": "BG",
    "label": "bulgaria"
  },
  {
    "value": "BF",
    "label": "burkina_Faso"
  },
  {
    "value": "BI",
    "label": "burundi"
  },
  {
    "value": "CV",
    "label": "cabo_Verde"
  },
  {
    "value": "KH",
    "label": "cambodia"
  },
  {
    "value": "CM",
    "label": "cameroon"
  },
  {
    "value": "CA",
    "label": "canada"
  },
  {
    "value": "KY",
    "label": "cayman_Islands"
  },
  {
    "value": "CF",
    "label": "central_African_Republic"
  },
  {
    "value": "TD",
    "label": "chad"
  },
  {
    "value": "CL",
    "label": "chile"
  },
  {
    "value": "CN",
    "label": "china"
  },
  {
    "value": "CX",
    "label": "christmas_Island"
  },
  {
    "value": "CO",
    "label": "colombia"
  },
  {
    "value": "KM",
    "label": "comoros"
  },
  {
    "value": "CG",
    "label": "congo"
  },
  {
    "value": "CD",
    "label": "congo_Democratic_Republic_of_the"
  },
  {
    "value": "CK",
    "label": "cook_Islands"
  },
  {
    "value": "CR",
    "label": "costa_Rica"
  },
  {
    "value": "HR",
    "label": "croatia"
  },
  {
    "value": "CU",
    "label": "cuba"
  },
  {
    "value": "CW",
    "label": "curaçao"
  },
  {
    "value": "CY",
    "label": "cyprus"
  },
  {
    "value": "CZ",
    "label": "czechia"
  },
  {
    "value": "CI",
    "label": "cote_dIvoire"
  },
  {
    "value": "DK",
    "label": "denmark"
  },
  {
    "value": "DJ",
    "label": "djibouti"
  },
  {
    "value": "DM",
    "label": "dominica"
  },
  {
    "value": "DO",
    "label": "dominican_Republic"
  },
  {
    "value": "EC",
    "label": "ecuador"
  },
  {
    "value": "EG",
    "label": "egypt"
  },
  {
    "value": "SV",
    "label": "el_Salvador"
  },
  {
    "value": "GQ",
    "label": "equatorial_Guinea"
  },
  {
    "value": "ER",
    "label": "eritrea"
  },
  {
    "value": "EE",
    "label": "estonia"
  },
  {
    "value": "SZ",
    "label": "eswatini"
  },
  {
    "value": "ET",
    "label": "ethiopia"
  },
  {
    "value": "FK",
    "label": "falkland_Islands_Malvinas"
  },
  {
    "value": "FO",
    "label": "faroe_Islands"
  },
  {
    "value": "FJ",
    "label": "fiji"
  },
  {
    "value": "FI",
    "label": "finland"
  },
  {
    "value": "FR",
    "label": "france"
  },
  {
    "value": "GF",
    "label": "french_Guiana"
  },
  {
    "value": "PF",
    "label": "french_Polynesia"
  },
  {
    "value": "TF",
    "label": "french_Southern_Territories"
  },
  {
    "value": "GA",
    "label": "gabon"
  },
  {
    "value": "GM",
    "label": "gambia"
  },
  {
    "value": "GE",
    "label": "georgia"
  },
  {
    "value": "DE",
    "label": "germany"
  },
  {
    "value": "GH",
    "label": "ghana"
  },
  {
    "value": "GI",
    "label": "gibraltar"
  },
  {
    "value": "GR",
    "label": "greece"
  },
  {
    "value": "GL",
    "label": "greenland"
  },
  {
    "value": "GD",
    "label": "grenada"
  },
  {
    "value": "GP",
    "label": "guadeloupe"
  },
  {
    "value": "GU",
    "label": "guam"
  },
  {
    "value": "GT",
    "label": "guatemala"
  },
  {
    "value": "GG",
    "label": "guernsey"
  },
  {
    "value": "GN",
    "label": "guinea"
  },
  {
    "value": "GW",
    "label": "guinea_Bissau"
  },
  {
    "value": "GY",
    "label": "guyana"
  },
  {
    "value": "HT",
    "label": "haiti"
  },
  {
    "value": "HM",
    "label": "heard_Island_and_McDonald_Islands"
  },
  {
    "value": "VA",
    "label": "holy_See"
  },
  {
    "value": "HN",
    "label": "honduras"
  },
  {
    "value": "HK",
    "label": "hong_Kong"
  },
  {
    "value": "HU",
    "label": "hungary"
  },
  {
    "value": "IS",
    "label": "iceland"
  },
  {
    "value": "IN",
    "label": "india"
  },
  {
    "value": "ID",
    "label": "indonesia"
  },
  {
    "value": "IR",
    "label": "iran_Islamic_Republicof"
  },
  {
    "value": "IQ",
    "label": "iraq"
  },
  {
    "value": "IE",
    "label": "ireland"
  },
  {
    "value": "IM",
    "label": "isle_of_Man"
  },
  {
    "value": "IT",
    "label": "italy"
  },
  {
    "value": "JM",
    "label": "jamaica"
  },
  {
    "value": "JP",
    "label": "japan"
  },
  {
    "value": "JE",
    "label": "jersey"
  },
  {
    "value": "JO",
    "label": "jordan"
  },
  {
    "value": "KZ",
    "label": "kazakhstan"
  },
  {
    "value": "KE",
    "label": "kenya"
  },
  {
    "value": "KI",
    "label": "kiribati"
  },
  {
    "value": "KP",
    "label": "korea_Democratic_Peoples_Republic_of"
  },
  {
    "value": "KR",
    "label": "korea_Republic_of"
  },
  {
    "value": "KW",
    "label": "kuwait"
  },
  {
    "value": "KG",
    "label": "kyrgyzstan",
  },
  {
    "value": "LA",
    "label": "lao_Peoples_Democratic_Republic"
  },
  {
    "value": "LV",
    "label": "latvia"
  },
  {
    "value": "LB",
    "label": "lebanon"
  },
  {
    "value": "LS",
    "label": "lesotho"
  },
  {
    "value": "LR",
    "label": "liberia"
  },
  {
    "value": "LY",
    "label": "libya"
  },
  {
    "value": "LI",
    "label": "liechtenstein"
  },
  {
    "value": "LT",
    "label": "lithuania"
  },
  {
    "value": "LU",
    "label": "luxembourg"
  },
  {
    "value": "MO",
    "label": "macao"
  },
  {
    "value": "MG",
    "label": "madagascar"
  },
  {
    "value": "MW",
    "label": "malawi"
  },
  {
    "value": "MY",
    "label": "malaysia"
  },
  {
    "value": "MV",
    "label": "maldives"
  },
  {
    "value": "ML",
    "label": "mali"
  },
  {
    "value": "MT",
    "label": "malta"
  },
  {
    "value": "MH",
    "label": "marshall_Islands"
  },
  {
    "value": "MQ",
    "label": "martinique"
  },
  {
    "value": "MR",
    "label": "mauritania"
  },
  {
    "value": "MU",
    "label": "mauritius"
  },
  {
    "value": "YT",
    "label": "mayotte"
  },
  {
    "value": "MX",
    "label": "mexico"
  },
  {
    "value": "FM",
    "label": "micronesia_Federated_States_of"
  },
  {
    "value": "MD",
    "label": "moldova_Republic_of"
  },
  {
    "value": "MC",
    "label": "monaco"
  },
  {
    "value": "MN",
    "label": "mongolia"
  },
  {
    "value": "ME",
    "label": "montenegro"
  },
  {
    "value": "MS",
    "label": "montserrat"
  },
  {
    "value": "MA",
    "label": "morocco"
  },
  {
    "value": "MZ",
    "label": "mozambique"
  },
  {
    "value": "MM",
    "label": "myanmar"
  },
  {
    "value": "NA",
    "label": "namibia"
  },
  {
    "value": "NR",
    "label": "nauru"
  },
  {
    "value": "NP",
    "label": "nepal"
  },
  {
    "value": "NL",
    "label": "netherlands"
  },
  {
    "value": "NC",
    "label": "new_Caledonia"
  },
  {
    "value": "NZ",
    "label": "new_Zealand"
  },
  {
    "value": "NI",
    "label": "nicaragua"
  },
  {
    "value": "NE",
    "label": "niger"
  },
  {
    "value": "NG",
    "label": "nigeria"
  },
  {
    "value": "NU",
    "label": "niue"
  },
  {
    "value": "NF",
    "label": "norfolk_Island"
  },
  {
    "value": "MK",
    "label": "north_Macedonia"
  },
  {
    "value": "MP",
    "label": "northern_Mariana_Islands"
  },
  {
    "value": "NO",
    "label": "norway"
  },
  {
    "value": "OM",
    "label": "oman"
  },
  {
    "value": "PK",
    "label": "pakistan"
  },
  {
    "value": "PW",
    "label": "palau"
  },
  {
    "value": "PS",
    "label": "palestine_State_of"
  },
  {
    "value": "PA",
    "label": "panama"
  },
  {
    "value": "PG",
    "label": "papua_New_Guinea"
  },
  {
    "value": "PY",
    "label": "paraguay"
  },
  {
    "value": "PE",
    "label": "peru"
  },
  {
    "value": "PH",
    "label": "philippines"
  },
  {
    "value": "PN",
    "label": "pitcairn"
  },
  {
    "value": "PL",
    "label": "poland"
  },
  {
    "value": "PT",
    "label": "portugal"
  },
  {
    "value": "PR",
    "label": "puerto_Rico"
  },
  {
    "value": "QA",
    "label": "qatar"
  },
  {
    "value": "RO",
    "label": "romania"
  },
  {
    "value": "RU",
    "label": "russian_Federation"
  },
  {
    "value": "RW",
    "label": "rwanda"
  },
  {
    "value": "RE",
    "label": "réunion"
  },
  {
    "value": "BL",
    "label": "saint_Barthélemy"
  },
  {
    "value": "SH",
    "label": "saint_Helena_Ascension_and_Tristan_da_Cunha"
  },
  {
    "value": "KN",
    "label": "saint_Kitts_and_Nevis"
  },
  {
    "value": "LC",
    "label": "saint_Lucia"
  },
  {
    "value": "MF",
    "label": "saint_Martin"
  },
  {
    "value": "PM",
    "label": "saint_Pierre_and_Miquelon"
  },
  {
    "value": "VC",
    "label": "saint_Vincent_and_the_Grenadines"
  },
  {
    "value": "WS",
    "label": "samoa"
  },
  {
    "value": "SM",
    "label": "san_Marino"
  },
  {
    "value": "ST",
    "label": "sao_Tome_and_Principe"
  },
  {
    "value": "SA",
    "label": "saudi_Arabia"
  },
  {
    "value": "SN",
    "label": "senegal"
  },
  {
    "value": "RS",
    "label": "serbia"
  },
  {
    "value": "SC",
    "label": "seychelles"
  },
  {
    "value": "SL",
    "label": "sierra_Leone"
  },
  {
    "value": "SG",
    "label": "singapore"
  },
  {
    "value": "SX",
    "label": "sint_Maarten"
  },
  {
    "value": "SK",
    "label": "slovakia"
  },
  {
    "value": "SI",
    "label": "slovenia"
  },
  {
    "value": "SB",
    "label": "solomon_Islands"
  },
  {
    "value": "SO",
    "label": "somalia"
  },
  {
    "value": "ZA",
    "label": "south_Africa"
  },
  {
    "value": "GS",
    "label": "south_Georgia_and_the_South_Sandwich_Islands"
  },
  {
    "value": "SS",
    "label": "south_Sudan"
  },
  {
    "value": "ES",
    "label": "spain"
  },
  {
    "value": "LK",
    "label": "sri_Lanka"
  },
  {
    "value": "SD",
    "label": "sudan"
  },
  {
    "value": "SR",
    "label": "suriname"
  },
  {
    "value": "SJ",
    "label": "svalbard_and_Jan_Mayen"
  },
  {
    "value": "SE",
    "label": "sweden"
  },
  {
    "value": "CH",
    "label": "Switzerland"
  },
  {
    "value": "SY",
    "label": "syrian_Arab_Republic"
  },
  {
    "value": "TW",
    "label": "taiwan_Province_of_China"
  },
  {
    "value": "TJ",
    "label": "tajikistan"
  },
  {
    "value": "TZ",
    "label": "tanzania_United_Republic_of"
  },
  {
    "value": "TH",
    "label": "thailand"
  },
  {
    "value": "TL",
    "label": "timor_Leste"
  },
  {
    "value": "TG",
    "label": "togo"
  },
  {
    "value": "TK",
    "label": "tokelau"
  },
  {
    "value": "TO",
    "label": "tonga"
  },
  {
    "value": "TT",
    "label": "trinidad_and_Tobago"
  },
  {
    "value": "TN",
    "label": "tunisia"
  },
  {
    "value": "TR",
    "label": "turkey"
  },
  {
    "value": "TM",
    "label": "turkmenistan"
  },
  {
    "value": "TC",
    "label": "turks_and_Caicos_Islands"
  },
  {
    "value": "TV",
    "label": "tuvalu"
  },
  {
    "value": "UG",
    "label": "uganda"
  },
  {
    "value": "UA",
    "label": "ukraine"
  },
  {
    "value": "AE",
    "label": "united_Arab_Emirates"
  },
  {
    "value": "GB",
    "label": "united_Kingdom"
  },
  {
    "value": "UM",
    "label": "united_States_Minor_Outlying_Islands"
  },
  {
    "value": "US",
    "label": "united_States"
  },
  {
    "value": "UY",
    "label": "uruguay"
  },
  {
    "value": "UZ",
    "label": "uzbekistan"
  },
  {
    "value": "VU",
    "label": "vanuatu"
  },
  {
    "value": "VE",
    "label": "venezuela_Bolivarian_Republic_of"
  },
  {
    "value": "VN",
    "label": "vietNam"
  },
  {
    "value": "VG",
    "label": "virgin_Islands_British"
  },
  {
    "value": "VI",
    "label": "virgin_Islands_US"
  },
  {
    "value": "WF",
    "label": "wallis_and_Futuna"
  },
  {
    "value": "YE",
    "label": "yemen"
  },
  {
    "value": "ZM",
    "label": "zambia"
  },
  {
    "value": "ZW",
    "label": "zimbabwe"
  }
];
  
export default countries;