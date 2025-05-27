
interface CampaignUrls {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

// Mapeamento de usuários para campaign IDs
const campaignUrls: CampaignUrls = {
  'azulviajante': {
    'lisbon': {
      'airpark': 'https://multipark.pt/book?city=lisbon&parkBrand=airpark&campaignId=6uRF1X1oPyj0A7xWI7vQ',
      'redpark': 'https://multipark.pt/book?city=lisbon&parkBrand=redpark&campaignId=ZOJniuQ4WvDtOUU8HfbV',
      'skypark': 'https://multipark.pt/book?city=lisbon&parkBrand=skypark&campaignId=wmbK3LocmDBZ6yrBdCHJ'
    },
    'faro': {
      'airpark': 'https://multipark.pt/book?city=faro&parkBrand=airpark&campaignId=LQgTapmlBytbekLcAz7i',
      'redpark': 'https://multipark.pt/book?city=faro&parkBrand=redpark&campaignId=OgfX2bzqLtPSMHUiIr4u',
      'skypark': 'https://multipark.pt/book?city=faro&parkBrand=skypark&campaignId=CKwODzBSNTfszUMNpB3q'
    },
    'porto': {
      'airpark': 'https://multipark.pt/book?city=porto&parkBrand=airpark&campaignId=65COcZcF4R2F4WIDSIGr',
      'redpark': 'https://multipark.pt/book?city=porto&parkBrand=redpark&campaignId=dbgvKQKxaBkAHJcwk7pE',
      'skypark': 'https://multipark.pt/book?city=porto&parkBrand=skypark&campaignId=GWVhYLhtzYaVfzLEiTHu'
    }
  },
  'bestravelcastelobranco': {
    'lisbon': {
      'airpark': 'https://multipark.pt/book?city=lisbon&parkBrand=airpark&campaignId=Br3FO5nO4rJb504WSd1I',
      'redpark': 'https://multipark.pt/book?city=lisbon&parkBrand=redpark&campaignId=fpQUZRuJmhtrhNZi9cC1',
      'skypark': 'https://multipark.pt/book?city=lisbon&parkBrand=skypark&campaignId=3ecZnocAw46EhChtrEXe'
    },
    'faro': {
      'airpark': 'https://multipark.pt/book?city=faro&parkBrand=airpark&campaignId=UNjTBKor29YrnIegmShz',
      'redpark': 'https://multipark.pt/book?city=faro&parkBrand=redpark&campaignId=fi8IkvWRxtzZYvZxiMNT',
      'skypark': 'https://multipark.pt/book?city=faro&parkBrand=skypark&campaignId=3E5sktFqMq0U6pRrC8JG'
    },
    'porto': {
      'airpark': 'https://multipark.pt/book?city=porto&parkBrand=airpark&campaignId=oWVc5iw5iWAWWFlan62N',
      'redpark': 'https://multipark.pt/book?city=porto&parkBrand=redpark&campaignId=BP9cNdiMRsQbKmscNCvr',
      'skypark': 'https://multipark.pt/book?city=porto&parkBrand=skypark&campaignId=Ge10ESRQVsOSEh5H6gox'
    }
  },
  'bestravelevora': {
    'lisbon': {
      'airpark': 'https://multipark.pt/book?city=lisbon&parkBrand=airpark&campaignId=8oDttn5JdJWNqKAWXbzZ',
      'redpark': 'https://multipark.pt/book?city=lisbon&parkBrand=redpark&campaignId=i5ZJ4rGv9p4HG79GvO1y',
      'skypark': 'https://multipark.pt/book?city=lisbon&parkBrand=skypark&campaignId=cG8y7I1gls2IqtqpRlXg'
    },
    'faro': {
      'airpark': 'https://multipark.pt/book?city=faro&parkBrand=airpark&campaignId=maSnolZAZBuK3ebq5Z8w',
      'redpark': 'https://multipark.pt/book?city=faro&parkBrand=redpark&campaignId=qbji69M37F7AfzSf7ttK',
      'skypark': 'https://multipark.pt/book?city=faro&parkBrand=skypark&campaignId=qnsyRLppI7IMXOiuIhIw'
    },
    'porto': {
      'airpark': 'https://multipark.pt/book?city=porto&parkBrand=airpark&campaignId=UJICS7A5GyyL1o0aYiiJ',
      'redpark': 'https://multipark.pt/book?city=porto&parkBrand=redpark&campaignId=jgBMDpkk1zD9vn7KsEKk',
      'skypark': 'https://multipark.pt/book?city=porto&parkBrand=skypark&campaignId=aPIx5AwAHHFJmZ0ObPcc'
    }
  }
};

export const getRedirectUrl = (username: string, city: string, brand: string): string => {
  const userKey = username.toLowerCase().replace(/\s+/g, '');
  const cityKey = city.toLowerCase();
  const brandKey = brand.toLowerCase();
  
  if (campaignUrls[userKey] && campaignUrls[userKey][cityKey] && campaignUrls[userKey][cityKey][brandKey]) {
    return campaignUrls[userKey][cityKey][brandKey];
  }
  
  // URL padrão se não encontrar o mapeamento específico
  return `https://multipark.pt/book?city=${cityKey}&parkBrand=${brandKey}`;
};

export const getUserSubdomain = (username: string): string => {
  const userKey = username.toLowerCase().replace(/\s+/g, '');
  return `${userKey}.dashboard-multipark.pt`;
};
