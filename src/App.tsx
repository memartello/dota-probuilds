import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  getHeroes,
  url,
  popularItems,
  dotaItems,
  itemMap,
} from "./api/dotaApi";
import { DotaHeroe } from "./interfaces/IHeroes";
import { PopularBuild } from "./interfaces/IPopularBuild";
import { DotaItem } from "./interfaces/IItems";

function App() {
  const [heroes, setHeroes] = useState<DotaHeroe[]>([]);
  const [popularBuild, setPopularBuild] = useState<PopularBuild>();
  const [items, setItems] = useState<{ [key: string]: number }>();
  const [itemsIds, setItemsIds] = useState<{ [key: string]: number }>();

  //const setHeroes: (valor) => void \\ lo que haces es modificar el valor de heroes.

  const infoHeroe = (heroId: number) => {
    fetch(popularItems(heroId))
      .then((res) => {
        return res.json();
      })
      .then((data: PopularBuild) => {
        setPopularBuild(data);
      });
  };

  useEffect(() => {
    const fetchHeroes = () => {
      fetch(getHeroes)
        .then((res) => {
          return res.json();
        })
        .then((data: DotaHeroe[]) => setHeroes(data));
    };
    const fetchItems = () => {
      fetch(dotaItems)
        .then((res) => {
          return res.json();
        })
        .then((data: { [key: string]: number }) => {
          setItems(data);
        });
    };
    const fetchItemsId = () => {
      fetch(itemMap)
        .then((res) => {
          return res.json();
        })
        .then((data: { [key: string]: number }) => {
          setItemsIds(data);
        });
    };
    fetchHeroes();
    fetchItems();
    fetchItemsId();
  }, []);

  return (
    <div className="App">
      <div>
        DOTA PRO BUILDS
        {heroes.map((heroe: DotaHeroe) => {
          return (
            <img
              src={url + heroe.img}
              height="80px"
              width="80px"
              onClick={() => infoHeroe(heroe.hero_id)}
            />
          );
        })}
      </div>
      <div>
        SELECTED HEROE START BUILD
        {popularBuild &&
          Object.keys(popularBuild).length > 0 &&
          Object.keys(popularBuild?.late_game_items).map((item) => {
            const itemName = itemsIds ? itemsIds[item] : "";
            const itemInfo: any = items ? items[itemName] : "";
            console.log(itemInfo);
            return <img src={url + itemInfo.img} />;
          })}
      </div>
    </div>
  );
}

export default App;
