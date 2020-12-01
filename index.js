const soap = require('soap');
const serviceUrl = 'https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx?wsdl';

export const verifyTurkishNationalId = (args) => {
  const { id, name, surname, year } = args;
  const check = {
    TCKimlikNo: Number(id),
    Ad: String(name).toUpperCase(),
    Soyad: String(surname).toUpperCase(),
    DogumYili: Number(year),
  };

  checkStatus(check).then((result) => {
    return result;
  });
};

function checkStatus(request) {
  return new Promise((resolve, reject) => {
    soap.createClient(serviceUrl, (err, client) => {
      client['TCKimlikNoDogrula'](request, (err, result, body) => {
        if (result.hasOwnProperty('TCKimlikNoDogrulaResult')) {
          return resolve(result.TCKimlikNoDogrulaResult);
        } else {
          return reject(err);
        }
      });
    });
  });
}
