export class EnumHelper {

    static getNamesAndValues<T extends number>(e: any) {
        return EnumHelper.getNames(e).map(n =>  ({id: e[n] as T, text: n, value: n}));
    }

    static getNames(e: any) {
        return EnumHelper.getObjValues(e).filter(v => typeof v === 'string') as string[];
    }

    static getValues<T extends number>(e: any) {
        return EnumHelper.getObjValues(e).filter(v => typeof v === 'number') as T[];
    }

    static getSelectList<T extends number, U>(e: any, stringConverter: (arg: U) => string) {
        const selectList = new Map<T, string>();
        this.getValues(e).forEach(val => selectList.set(val as T, stringConverter(val as unknown as U)));
        return selectList;
    }

    static getSelectListAsArray<T extends number, U>(e: any, stringConverter: (arg: U) => string) {
        return Array.from(this.getSelectList(e, stringConverter), value => ({ value: value[0] as T, presentation: value[1] }));
    }

    private static getObjValues(e: any): (number | string)[] {
        return Object.keys(e).map(k => e[k]);
    }

    static getOptionStringList(e: any)
    {
        const keys = Object.keys(e);
        return keys.map(n =>  ({id: 0, text: e[n], value: n}));
    }
}