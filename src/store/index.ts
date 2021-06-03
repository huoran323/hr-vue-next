import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { RootStateTypes } from './interface/index';
import user from './modules/user.ts';

export const key: InjectionKey<Store<RootStateTypes>> = Symbol();

export const store = createStore<RootStateTypes>({
    modules: {
        user,
    },
});

export function useStore() {
    return baseUseStore(key);
}
