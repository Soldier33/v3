import request from '/@/utils/request'

export function getOption() {
  return request({
    url:  '/api/class/teach',
    method: 'get'
  })
}

export function getData(data) {
  return request({
    url: `/api/integral-statictis/class/${data.className}/week/${data.week}`,
    method: 'get',
    params: {
      pindex: data.pindex,
      week: data.week,
      calssId: data.classId,
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