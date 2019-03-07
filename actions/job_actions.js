import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import { 
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS,
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?'
const JOB_QUERY_PARAMNS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript'
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({...JOB_QUERY_PARAMNS, l: zip});
  return `${JOB_ROOT_URL}${query}`;
}

export const fetchJobs = (region, callback) => async dispatch => {
  try {
    //let zip = await reverseGeocode(region);
    //const url = buildJobsUrl(zip);
    let data = [
      { 
        id: 1, 
        text: '"My business, my rules."', 
        uri: 'https://d1u1mce87gyfbn.cloudfront.net/hero/ashe/hero-select-portrait.png', 
        name: 'Elizabeth Caledonia "Calamity" Ashe'
      },
      { 
        id: 2, 
        text: '“I play to win.”', 
        uri: 'https://d1u1mce87gyfbn.cloudfront.net/hero/dva/hero-select-portrait.png', 
        name: 'Hana Song' 
      },
      { 
        id: 3, 
        text: '"Cheers, love! The cavalry is here!"', 
        uri: 'https://d1u1mce87gyfbn.cloudfront.net/hero/tracer/hero-select-portrait.png', 
        name: 'Lena Oxton' 
      },
      { 
        id: 4, 
        text: 'Александра Зарянова', 
        uri: 'https://d1u1mce87gyfbn.cloudfront.net/hero/zarya/hero-select-portrait.png', 
        name: 'Aleksandra Zaryanova' },
      { id: 5, 
        text: '"Everything can be hacked... and everyone."', 
        uri: 'https://d1u1mce87gyfbn.cloudfront.net/hero/sombra/hero-select-portrait.png', 
        name: 'Olivia Colomar "Sombra"' 
      }, 
      { id: 6, 
        text: '"I will protect the innocent."', 
        uri: 'https://d1u1mce87gyfbn.cloudfront.net/hero/pharah/hero-select-portrait.png', 
        name: 'Fareeha Amari' 
      },
      { id: 7, 
        text: '"I will be watching over you."', 
        uri: 'https://d1u1mce87gyfbn.cloudfront.net/hero/mercy/hero-select-portrait.png', 
        name: '	Angela Ziegler' 
      },
      { id: 8, 
        text: '"I will prove myself!"', 
        uri: 'https://d1u1mce87gyfbn.cloudfront.net/hero/brigitte/hero-select-portrait.png', 
        name: 'Brigitte Lindholm' 
      },
    ];//await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: data });
    callback();
  } catch (e) {
    console.error(e);
  }
};

export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB
  };
};

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
};