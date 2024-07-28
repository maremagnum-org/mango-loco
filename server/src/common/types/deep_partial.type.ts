type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T[P] extends Function
    ? T[P]
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

/**
 * `DeepPartialType` es una función que toma una referencia de clase y devuelve una nueva clase con todas sus propiedades hechas opcionales de forma recursiva.
 *
 * @param classRef - Una referencia de clase de la cual se creará una nueva clase con todas las propiedades hechas opcionales de forma recursiva.
 * @returns Una nueva clase con todas las propiedades de la clase original hechas opcionales de forma recursiva.
 */
export function DeepPartialType<T>(
  classRef: new (...args: unknown[]) => T
): new () => DeepPartial<T> {
  return class {
    constructor() {
      return classRef.prototype;
    }
  } as new () => DeepPartial<T>;
}
