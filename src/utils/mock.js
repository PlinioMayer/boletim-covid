const states = [
  {
    name: 'Acre',
    population: 773559,
    region: 'NORTE'
  },
  {
    name: 'Alagoas',
    population: 3351543,
    region: 'NORDESTE'
  },
  {
    name: 'Amapá',
    population: 669526,
    region: 'NORTE'
  },
  {
    name: 'Amazonas',
    population: 4207714,
    region: 'NORTE'
  },
  {
    name: 'Bahia',
    population: 14016906,
    region: 'NORDESTE'
  },
  {
    name: 'Ceará',
    population: 8452381,
    region: 'NORDESTE'
  },
  {
    name: 'Espírito Santo',
    population: 3514952,
    region: 'SUDESTE'
  },
  {
    name: 'Goiás',
    population: 6003788,
    region: 'CENTRO_OESTE'
  },
  {
    name: 'Maranhão',
    population: 6574789,
    region: 'NORDESTE'
  },
  {
    name: 'Mato Grosso',
    population: 3035122,
    region: 'CENTRO_OESTE'
  },
  {
    name: 'Mato Grosso do Sul',
    population: 2449024,
    region: 'CENTRO_OESTE'
  },
  {
    name: 'Minas Gerais',
    population: 19597330,
    region: 'SUDESTE'
  },
  {
    name: 'Pernambuco',
    population: 8796448,
    region: 'NORDESTE'
  },
  {
    name: 'Paraná',
    population: 10444526,
    region: 'SUL'
  },
  {
    name: 'Paraíba',
    population: 3766528,
    region: 'NORDESTE'
  },
  {
    name: 'Pará',
    population: 7581051,
    region: 'NORTE'
  },
  {
    name: 'Piauí',
    population: 3118360,
    region: 'NORDESTE'
  },
  {
    name: 'Rio de Janeiro',
    population: 15989929,
    region: 'dSUDESTE'
  },
  {
    name: 'Rio Grande do Norte',
    population: 3168027,
    region: 'NORDESTE'
  },
  {
    name: 'Rio Grande do Sul',
    population: 11422973,
    region: 'SUL'
  },
  {
    name: 'Rondônia',
    population: 1562409,
    region: 'NORTE'
  },
  {
    name: 'Roraima',
    population: 450479,
    region: 'NORTE'
  },
  {
    name: 'Santa Catarina',
    population: 6248436,
    region: 'SUL'
  },
  {
    name: 'São Paulo',
    population: 41262199,
    region: 'SUL'
  },
  {
    name: 'Sergipe',
    population: 2068017,
    region: 'NORDESTE'
  },
  {
    name: 'Tocantins',
    population: 1590248,
    region: 'NORTE'
  },
  {
    name: 'Distrito Federal',
    population: 2570160,
    region: 'CENTRO_OESTE'
  }
];

const cities = [
  {
    name: 'Rio Branco',
    population: 413418,
    state_id: 1
  },
  {
    name: 'Maceió',
    population: 1025360,
    state_id: 2
  },
  {
    name: 'Macapá',
    population: 512902,
    state_id: 3
  },
  {
    name: 'Manaus',
    population: 2219580,
    state_id: 4
  },
  {
    name: 'Salvador',
    population: 2886698,
    state_id: 5
  },
  {
    name: 'Fortaleza',
    population: 2686612,
    state_id: 6
  },
  {
    name: 'Vitória',
    population: 365855,
    state_id: 7
  },
  {
    name: 'Goiânia',
    population: 1536097,
    state_id: 8
  },
  {
    name: 'São Luís',
    population: 1108975,
    state_id: 9
  },
  {
    name: 'Cuiabá',
    population: 618124,
    state_id: 10
  },
  {
    name: 'Campo Grande',
    population: 906092,
    state_id: 11
  },
  {
    name: 'Belo Horizonte',
    population: 2521564,
    state_id: 12
  },
  {
    name: 'Recife',
    population: 1653461,
    state_id: 13
  },
  {
    name: 'Curitiba',
    population: 1948626,
    state_id: 14
  },
  {
    name: 'João Pessoa',
    population: 817511,
    state_id: 15
  },
  {
    name: 'Belém',
    population: 1499641,
    state_id: 16
  },
  {
    name: 'Terezina',
    population: 868075,
    state_id: 17
  },
  {
    name: 'Rio de Janeiro',
    population: 6747815,
    state_id: 18
  },
  {
    name: 'Natal',
    population: 890480,
    state_id: 19
  },
  {
    name: 'Porto Alegre',
    population: 1488252,
    state_id: 20
  },
  {
    name: 'Porto Velho',
    population: 539354,
    state_id: 21
  },
  {
    name: 'Boa Vista',
    population: 419652,
    state_id: 22
  },
  {
    name: 'Florianópolis',
    population: 508826,
    state_id: 23
  },
  {
    name: 'São Paulo',
    population: 12325232,
    state_id: 24
  },
  {
    name: 'Aracajú',
    population: 664908,
    state_id: 25
  },
  {
    name: 'Palmas',
    population: 306296,
    state_id: 26
  },
  {
    name: 'Brasília',
    population: 3055149,
    state_id: 27
  }
].map((elem, index) => ({ name: elem.name, population: elem.population, state: states[index].name}));

const riskGroups = [
  {
    name: 'IDOSO',
  },
  {
    name: 'CARDIACO'
  },
  {
    name: 'DOENTE_PULMONAR'
  },
  {
    name: 'TABAGISTA'
  },
  {
    name: 'DIABETICO'
  },
  {
    name: 'OTARIO'
  },
  {
    name: 'IMUNODEPRESSIVO'
  },
  {
    name: 'DOENTE_RENAL'
  },
  {
    name: 'DOENTE_HEPATICO'
  },
  {
    name: 'DOENTE_NEURODEGENRATIVO'
  },
  {
    name: 'TRABALHADOR_DA_SAUDE'
  }
]

const people = [
  {
    cpf: "02401415229",
    name: "Luís Augusto Moreira",
    gender: "MASCULINO",
    birthdate: "01-05-1995",
    case: 'Óbito'
  },
  {
    cpf: "05423459143",
    name: "Marcelo Figueiredo",
    gender: "MASCULINO",
    birthdate: "15-06-1989",
    case: 'Óbito'
  },
  {
    cpf: "88987616172",
    name: "Maria Antônia da Silva",
    gender: "FEMININO",
    birthdate: "04-01-2004",
    case: 'Óbito'
  },
  {
    cpf: "03857462838",
    name: "Ana Coutinho Lima",
    gender: "FEMININO",
    birthdate: "26-04-1965",
    case: 'Óbito'
  },
  {
    cpf: "59294687398",
    name: "Luciana Melo de Jesus",
    gender: "FEMININO",
    birthdate: "17-03-1997",
    case: 'Óbito'
  },
  {
    cpf: "84370583739",
    name: "Matheus Araújo de Souza Campos",
    gender: "MASCULINO",
    birthdate: "23-07-1958",
    case: 'Óbito'
  }
]

export { states, cities, riskGroups, people };