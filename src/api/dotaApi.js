export const url = "https://api.opendota.com";
export const api = `${url}/api`;

export const getHeroes = `${api}/heroStats`;
export const popularItems = (heroeId) =>
  `${api}/heroes/${heroeId}/itemPopularity`;
export const dotaItems = `${api}/constants/items`;
export const itemMap = `${api}/constants/item_ids`;
