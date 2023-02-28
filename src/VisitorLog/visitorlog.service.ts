import client from '../client.js';
import {CreateVisitorLogDTO} from './visitorlog.model.js';

export class VisitorLogService {
    async getAllVisitorLogs() {
        const {data: visitorLog, error} = await client
            .from('visitor_log')
            .select('*')
        if (error === null) {
            return visitorLog
        } else {
            return {
                error: error
            }
        }
    }

    async createVisitorLog(visitorLog: CreateVisitorLogDTO) {
        try {
            return await client
                .from('visitor_log')
                .insert([
                    {
                        qr_code: visitorLog.qr_code,
                        location: visitorLog.location
                    }
                ])
        } catch (e) {
            return {
                error: e
            }
        }
    }

    // get visitor logs for today
    async getVisitorLogsForToday() {
        const dateToday = new Date(new Date().setHours(8, 0, 0, 0)).toISOString()
        const {data: visitorLog, error} = await client
            .from('visitor_log')
            .select('*')
            .gte('created_at', dateToday)
        if (error === null) {
            let count = visitorLog.length
            return count
        } else {
            return {
                error: error
            }
        }
    }

    // get number of male and female per month
    async getGenderCountPerMonth() {
        const {data: january, error: januaryError} = await client.from('gender_distrib_january').select('*')
        const {data: february, error: februaryError} = await client.from('gender_distrib_february').select('*')
        const {data: march, error: marchError} = await client.from('gender_distrib_march').select('*')
        const {data: april, error: aprilError} = await client.from('gender_distrib_april').select('*')
        const {data: may, error: mayError} = await client.from('gender_distrib_may').select('*')
        const {data: june, error: juneError} = await client.from('gender_distrib_june').select('*')
        const {data: july, error: julyError} = await client.from('gender_distrib_july').select('*')
        const {data: august, error: augustError} = await client.from('gender_distrib_august').select('*')
        const {data: september, error: septemberError} = await client.from('gender_distrib_september').select('*')
        const {data: october, error: octoberError} = await client.from('gender_distrib_october').select('*')
        const {data: november, error: novemberError} = await client.from('gender_distrib_november').select('*')
        const {data: december, error: decemberError} = await client.from('gender_distrib_december').select('*')
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
            }
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
            ]
            return consumableData
        } else {
            return {
                error: januaryError
            }
        }
    }

    async getBarangayCountPerMonth() {
        const month = new Date().getMonth()
        
        switch(month) {
            case 0:
                const {data: jan} = await client.from('barangay_jan').select('*').neq('barangay', '').order('count', {ascending:false})
                return jan

            case 1:
                const {data: feb} = await client.from('barangay_feb').select('*').neq('barangay', '').order('count', {ascending:false})
                return feb

            case 2:
                const {data: mar} = await client.from('barangay_mar').select('*').neq('barangay', '').order('count', {ascending:false})
                return mar

            case 3:
                const {data: apr} = await client.from('barangay_apr').select('*').neq('barangay', '').order('count', {ascending:false})
                return apr


            case 4:
                const {data: may} = await client.from('barangay_apr').select('*').neq('barangay', '').order('count', {ascending:false})
                return may

            case 5:
                const {data: jun} = await client.from('barangay_may').select('*').neq('barangay', '').order('count', {ascending:false})
                return jun

            case 6:
                const {data: jul} = await client.from('barangay_jun').select('*').neq('barangay', '').order('count', {ascending:false})
                return jul

            case 7:
                const {data: aug} = await client.from('barangay_jul').select('*').neq('barangay', '').order('count', {ascending:false})
                return aug

            case 8:
                const {data: sept} = await client.from('barangay_aug').select('*').neq('barangay', '').order('count', {ascending:false})
                return sept

            case 9:
                const {data: oct} = await client.from('barangay_sep').select('*').neq('barangay', '').order('count', {ascending:false})
                return oct

            case 10:
                const {data: nov} = await client.from('barangay_oct').select('*').neq('barangay', '').order('count', {ascending:false})
                return nov

            case 11:
                const {data: dec} = await client.from('barangay_nov').select('*').neq('barangay', '').order('count', {ascending:false})
                return dec
        }
    }

    async getVisitorLogsPerLocation(date: any = new Date().toISOString()) {
        const dateEntered = new Date(date).toISOString()
        const {data: visitorLog, error: visitorLogError} = await client
            .from('visitor_log')
            .select('location')
            .gte('created_at', dateEntered)
        let counts: any = {
            entrance: 0,
            childrensArea: 0,
            generalCollections: 0
        }

        if (visitorLogError===null) {
            visitorLog?.forEach((log: any) => {
                if (log.location === 'Entrance') {
                    counts.entrance += 1
                } else if (log.location === "Children's Area") {
                    counts.childrensArea += 1
                } else if (log.location === 'General Collections') {
                    counts.generalCollections += 1
                }
            })
            return counts
        } else {
            return {
                error: visitorLogError
            } 
        }
    }
}