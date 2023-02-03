var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import client from '../client.js';
export class VisitorLogService {
    getAllVisitorLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: visitorLog, error } = yield client
                .from('visitor_log')
                .select('*');
            if (error === null) {
                return visitorLog;
            }
            else {
                return {
                    error: error
                };
            }
        });
    }
    createVisitorLog(visitorLog) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield client
                    .from('visitor_log')
                    .insert([
                    {
                        qr_code: visitorLog.qr_code,
                        location: visitorLog.location
                    }
                ]);
            }
            catch (e) {
                return {
                    error: e
                };
            }
        });
    }
    // get visitor logs for today
    getVisitorLogsForToday() {
        return __awaiter(this, void 0, void 0, function* () {
            const dateToday = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
            const { data: visitorLog, error } = yield client
                .from('visitor_log')
                .select('*')
                .gte('created_at', dateToday);
            if (error === null) {
                return visitorLog.length;
            }
            else {
                return {
                    error: error
                };
            }
        });
    }
    // get number of male and female per month
    getGenderCountPerMonth() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: january, error: januaryError } = yield client.from('gender_distrib_january').select('*');
            const { data: february, error: februaryError } = yield client.from('gender_distrib_february').select('*');
            const { data: march, error: marchError } = yield client.from('gender_distrib_march').select('*');
            const { data: april, error: aprilError } = yield client.from('gender_distrib_april').select('*');
            const { data: may, error: mayError } = yield client.from('gender_distrib_may').select('*');
            const { data: june, error: juneError } = yield client.from('gender_distrib_june').select('*');
            const { data: july, error: julyError } = yield client.from('gender_distrib_july').select('*');
            const { data: august, error: augustError } = yield client.from('gender_distrib_august').select('*');
            const { data: september, error: septemberError } = yield client.from('gender_distrib_september').select('*');
            const { data: october, error: octoberError } = yield client.from('gender_distrib_october').select('*');
            const { data: november, error: novemberError } = yield client.from('gender_distrib_november').select('*');
            const { data: december, error: decemberError } = yield client.from('gender_distrib_december').select('*');
            if (januaryError === null && februaryError === null && marchError === null && aprilError === null && mayError === null && juneError === null && julyError === null && augustError === null && septemberError === null && octoberError === null && novemberError === null && decemberError === null) {
                const genderData = {
                    // count number of 1s in the array
                    january: {
                        male: january.filter(data => data.sex === 1).length,
                        female: january.filter(data => data.sex === 2).length,
                        lgbt: january.filter(data => data.sex === 3).length,
                    },
                    february: {
                        male: february.filter(data => data.sex === 1).length,
                        female: february.filter(data => data.sex === 2).length,
                        lgbt: february.filter(data => data.sex === 3).length,
                    },
                    march: {
                        male: march.filter(data => data.sex === 1).length,
                        female: march.filter(data => data.sex === 2).length,
                        lgbt: march.filter(data => data.sex === 3).length,
                    },
                    april: {
                        male: april.filter(data => data.sex === 1).length,
                        female: april.filter(data => data.sex === 2).length,
                        lgbt: april.filter(data => data.sex === 3).length,
                    },
                    may: {
                        male: may.filter(data => data.sex === 1).length,
                        female: may.filter(data => data.sex === 2).length,
                        lgbt: may.filter(data => data.sex === 3).length,
                    },
                    june: {
                        male: june.filter(data => data.sex === 1).length,
                        female: june.filter(data => data.sex === 2).length,
                        lgbt: june.filter(data => data.sex === 3).length,
                    },
                    july: {
                        male: july.filter(data => data.sex === 1).length,
                        female: july.filter(data => data.sex === 2).length,
                        lgbt: july.filter(data => data.sex === 3).length,
                    },
                    august: {
                        male: august.filter(data => data.sex === 1).length,
                        female: august.filter(data => data.sex === 2).length,
                        lgbt: august.filter(data => data.sex === 3).length,
                    },
                    september: {
                        male: september.filter(data => data.sex === 1).length,
                        female: september.filter(data => data.sex === 2).length,
                        lgbt: september.filter(data => data.sex === 3).length,
                    },
                    october: {
                        male: october.filter(data => data.sex === 1).length,
                        female: october.filter(data => data.sex === 2).length,
                        lgbt: october.filter(data => data.sex === 3).length,
                    },
                    november: {
                        male: november.filter(data => data.sex === 1).length,
                        female: november.filter(data => data.sex === 2).length,
                        lgbt: november.filter(data => data.sex === 3).length,
                    },
                    december: {
                        male: december.filter(data => data.sex === 1).length,
                        female: december.filter(data => data.sex === 2).length,
                        lgbt: december.filter(data => data.sex === 3).length,
                    }
                };
                let consumableData = [
                    {
                        id: 'Male',
                        color: '#00104A',
                        data: [
                            {
                                x: 'JAN',
                                y: genderData.january.male
                            },
                            {
                                x: 'FEB',
                                y: genderData.february.male
                            },
                            {
                                x: 'MAR',
                                y: genderData.march.male
                            },
                            {
                                x: 'APR',
                                y: genderData.april.male
                            },
                            {
                                x: 'MAY',
                                y: genderData.may.male
                            },
                            {
                                x: 'JUN',
                                y: genderData.june.male
                            },
                            {
                                x: 'JUL',
                                y: genderData.july.male
                            },
                            {
                                x: 'AUG',
                                y: genderData.august.male
                            },
                            {
                                x: 'SEP',
                                y: genderData.september.male
                            },
                            {
                                x: 'OCT',
                                y: genderData.october.male
                            },
                            {
                                x: 'NOV',
                                y: genderData.november.male
                            },
                            {
                                x: 'DEC',
                                y: genderData.december.male
                            },
                        ]
                    },
                    {
                        id: 'Female',
                        color: '#f796a7',
                        data: [
                            {
                                x: 'JAN',
                                y: genderData.january.female
                            },
                            {
                                x: 'FEB',
                                y: genderData.february.female
                            },
                            {
                                x: 'MAR',
                                y: genderData.march.female
                            },
                            {
                                x: 'APR',
                                y: genderData.april.female
                            },
                            {
                                x: 'MAY',
                                y: genderData.may.female
                            },
                            {
                                x: 'JUN',
                                y: genderData.june.female
                            },
                            {
                                x: 'JUL',
                                y: genderData.july.female
                            },
                            {
                                x: 'AUG',
                                y: genderData.august.female
                            },
                            {
                                x: 'SEP',
                                y: genderData.september.female
                            },
                            {
                                x: 'OCT',
                                y: genderData.october.female
                            },
                            {
                                x: 'NOV',
                                y: genderData.november.female
                            },
                            {
                                x: 'DEC',
                                y: genderData.december.female
                            },
                        ]
                    },
                    {
                        id: 'LGBTQIA+',
                        color: '#025AAF',
                        data: [
                            {
                                x: 'JAN',
                                y: genderData.january.lgbt
                            },
                            {
                                x: 'FEB',
                                y: genderData.february.lgbt
                            },
                            {
                                x: 'MAR',
                                y: genderData.march.lgbt
                            },
                            {
                                x: 'APR',
                                y: genderData.april.lgbt
                            },
                            {
                                x: 'MAY',
                                y: genderData.may.lgbt
                            },
                            {
                                x: 'JUN',
                                y: genderData.june.lgbt
                            },
                            {
                                x: 'JUL',
                                y: genderData.july.lgbt
                            },
                            {
                                x: 'AUG',
                                y: genderData.august.lgbt
                            },
                            {
                                x: 'SEP',
                                y: genderData.september.lgbt
                            },
                            {
                                x: 'OCT',
                                y: genderData.october.lgbt
                            },
                            {
                                x: 'NOV',
                                y: genderData.november.lgbt
                            },
                            {
                                x: 'DEC',
                                y: genderData.december.lgbt
                            },
                        ]
                    }
                ];
                return consumableData;
            }
            else {
                return {
                    error: januaryError
                };
            }
        });
    }
}
