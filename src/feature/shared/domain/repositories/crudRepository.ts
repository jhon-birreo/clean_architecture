import { Nullable } from '../../../../core/domain/types/NullableType';

export interface MainCrudRepository<T> {
	/**
	 * @method find Encuentra uno o varios registros segun el caso;
	 * @param {Object} queryParams  Parametros para realizar el filtro;
	 * @returns {Promise<Nullable<T[]>>}
	 */
	find(queryParams?: Object): Promise<Nullable<T[]>>;

	/**
	 * @method create Registrar un documento;
	 * @param {T} data Las entidades para registrar;
	 * @returns {Promise<Nullable<T>>}
	 */
	create(data: T): Promise<Nullable<T>>;

	/**
	 * @method update Actualiza.
	 * @param {number} id  El id del registro;
	 * @param {T} data Las entidades a actualizar ;
	 * @returns {Promise<Nullable<T>>}
	 */
	update(id: number, data: T): Promise<Nullable<T>>;

	/**
	 * @method delete Eliminar
	 * @param {number} id  El id del registro;
	 * @returns {Promise<string | any>}
	 */
	delete(id: number): Promise<any>;

	/**
	 * @method findOne Encuentra un registro segun el caso.
	 * @param {Object} payload  Parametros para realizar el filtro;
	 * @returns {Promise<Nullable<T>>}
	 */
	findOne(payload: object): Promise<Nullable<T>>;
}
