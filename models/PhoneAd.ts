/**
 * Interface des données d'un film.
 */
export interface PhoneAd {
  id: string;
  model: string;
  constructor: string;
  os: string;
  releaseDate: string;
  salerAvatar: string;
  saler: string;
  description: string;
  salerGender: string;
  salerCity: string;
  salerCountry: string;
  phone: string;
  price: string;
}

/**
 * Méthode retournant un tableau d'annonce de vente de téléphones.
 */
export async function getPhonesAds(): Promise<PhoneAd[]> {
  try {
    const res: PhoneAd[] = [];

    const data = require("../data/phone.json");

    data.forEach((value: any) => {
      res.push({
        id: value.id,
        model: value.model,
        constructor: value["constructor"],
        os: value.os,
        releaseDate: value.releaseDate,
        salerAvatar: value.salerAvatar,
        saler: value.saler,
        description: value.description,
        salerGender: value.salerGender,
        salerCity: value.salerCity,
        salerCountry: value.salerCountry,
        phone: value.phone,
        price: value.price,
      });
    });
    return res;
  } catch (error: any) {
    throw error;
  }
}
