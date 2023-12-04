import { Amiibo } from '@/dto/amiibo.type';

export function anAmiibo(override?: Partial<Amiibo>): Amiibo {
	return {
		name: 'Green Yarn Yoshi',
		image: 'https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00030102-00410302.png',
		id: '0003010200410302',
		releaseEurope: '2015-06-26',
		type: 'Yarn',
		serie: 'Yoshi\'s Woolly World',
		...override,
	}
}
