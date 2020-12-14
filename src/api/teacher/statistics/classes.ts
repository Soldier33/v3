import request from '/@/utils/request'

export function getOption() {
  return request({
    url: `/api/class/teach`,
    method: 'get',
  })
}

export function getData(data) {
  const url = data.week != -1 ?
      `/api/integral-statictis/gradeId/${data.gradeId}/week/${data.week}` :
      `/api/integral-statictis/getTotalScoreBySchoolId/week/${data.week}`
  return request({
    method: 'get',
    url,
    params: {
      pindex: data.pindex,
      number: data.number,
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