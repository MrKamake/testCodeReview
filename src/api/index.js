import productItems from '../mock-data/productItems';
import coupons from '../mock-data/coupons';
import { TIME_OUT } from '../constants';

const data = { coupons, productItems };

const getDataApi = dataName =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data[dataName]);
    }, TIME_OUT);
  });

export { getDataApi };
