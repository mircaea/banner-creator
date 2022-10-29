import React, { ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  createBanner,
  deleteDocByPath,
  getBanners,
  updateBanner,
} from "../firebase/data";
import { BannerType } from "../firebase/types";
import { deleteFile, uploadFile } from "../firebase/storage";

interface AppContextType {
  currentUser: User | undefined;
  banners: BannerType[];
  create_banner: (request: BannerType) => Promise<BannerType | undefined>;
  update_banner: (request: BannerType) => Promise<void>;
  delete_banner: (item: BannerType) => Promise<void>;
  upload_file: (file: File) => Promise<string>;
}

const AppContext = React.createContext<AppContextType>(null!);

export function useAppContext() {
  return useContext(AppContext);
}

export function ContextProvider({ children }: { children: ReactNode }) {
  let [currentUser, setCurrentUser] = useState<User>();
  const [banners, setBanners] = useState<BannerType[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        let loggedIn = user && user.email ? user.email : "";
        if (currentUser !== user) {
          setCurrentUser(user ?? undefined);
        }
        if (localStorage.getItem("logged_in") !== loggedIn) {
          localStorage.setItem("logged_in", loggedIn);
        }
      },
      (error) => {
        console.log("Error on Auth State Changed: ", error);
      },
      () => {}
    );

    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  useEffect(() => {
    const get_banners_inside_use_effect = async () => {
      try {
        const result: object[] | undefined = await getBanners();
        if (result) {
          setBanners(result as BannerType[]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    get_banners_inside_use_effect();
  }, []);

  // const hot_get_banners = () => {
  //   // use a backend server to get all banners
  // };

  const updateBannersContextState = (obj: BannerType) => {
    if (!banners) {
      setBanners([obj]);
      return;
    }
    let needToAdd = true;
    let parsedArray = banners.map((el) => {
      if (el.id === obj.id) {
        needToAdd = false;
        return obj;
      } else return el;
    });
    if (needToAdd) {
      parsedArray = [...banners, obj];
    }

    setBanners(parsedArray);
  };
  const deleteBannerFromContextState = (id: string) => {
    if (!banners) {
      // should attempt to delete from db
      return;
    }
    const filtered = banners.filter((pg) => pg.id !== id);
    setBanners(filtered);
  };
  const create_banner = async (request: BannerType) => {
    try {
      const result = await createBanner(request);
      if (result) {
        updateBannersContextState(result);
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const update_banner = async (request: BannerType) => {
    try {
      const result = await updateBanner(request);
      updateBannersContextState(request);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const delete_banner = async (item: BannerType) => {
    if (!item.id) return;
    try {
      await deleteDocByPath(`banners/${item.id}`);
      if (item.url) await deleteFile(item.url);
      // update local state:
      deleteBannerFromContextState(item.id);
    } catch (error) {
      console.log(error);
    }
  };

  const upload_file = async (file: File) => {
    try {
      return await uploadFile(file);
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  let value = {
    currentUser,
    banners,
    create_banner,
    update_banner,
    delete_banner,
    upload_file,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
