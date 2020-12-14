import request from '/@/utils/request'

export function getOption() {
  return request({
    url:  '/api/class/teach',
    method: 'get'
  })
}

export function getData(data) {
  return request({
    url: `api/integral-statictis/getTotalScoreBySchoolId/week/${data.week}`,
    method: 'get',
    params: {
      pindex: data.pindex,
      number: data.number
    }  })
}


export function getCurrentWeek(schoolId) {
  return request({
    url: '/api/util/getCurrentWeek',
    method: 'get',
    params: {
      schoolId
    }
  })
}