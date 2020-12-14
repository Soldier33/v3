import request from '/@/utils/request'

export function getOption() {
  return request({
    url: '/api/class/teach',
    method: 'get',
  })
}

export function getData(data) {
  return request({
    url: `/api/integral-statictis/class/${data.classId}/week/${data.week}`,
    method: 'get',
    params: {
      pindex: data.pindex,
      week: data.week,
      number: data.number,
      target: data.target,
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