export function convertOverlapParams<T1 = any, T2 = any>(obj1: any, obj2: any): [obj1: T1, obj2: T2] {
    return[obj1.gameObject as T1, obj2.gameObject as T2]
}
