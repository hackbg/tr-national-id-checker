const soap = require('soap');
const serviceUrl = 'https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx?wsdl';

async function verifyTurkishNationalId(args) {
  const { id, name, surname, year } = args;
  const check = {
    TCKimlikNo: Number(id),
    Ad: String(name).toUpperCase(),
    Soyad: String(surname).toUpperCase(),
    DogumYili: Number(year),
  };

  const result = await checkStatus(check).catch(console.log);
  return result;
}

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

module.exports = {
  verify: verifyTurkishNationalId,
};
