import request from '/@/utils/request'

export function getOption() {
  return request({
    url:  '/api/class/teach',
    method: 'get'
  })
}

export function getData(data) {
  return request({
    url: `/api/integral-statictis/getClassStyleList`,
    method: 'get',
    params: {
      week: data.week,
      classId: data.classId,
      pindex: data.pindex,
      number: data.number,
      gradeId: data.gradeId,
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