import {
	getOptionalCity
} from '../service/getData'
import {
	GET_OPTIONAL_CITY
} from './mutation-types.js'

export default {
	async getOptionalCity({
		commit,
		state
	}) {
    getOptionalCity({
      success(){
        commit(GET_OPTIONAL_CITY, res)
      }
    });

	}
}
