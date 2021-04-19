import request from '/@/utils/request'

export function getOption() {
  return request({
    url: `/api/class/teach`,
    method: 'get',
  })
}

export function getData(data) {
  return request({
    url : `/api/evaluation/teacher/week/${data.week}/class/${data.classId}/term/${data.term}`,
    method: 'get',
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

export function getAllTerms(data) {
  return request({
    url: '/api/remark/comment/getAllTerms',
    method: 'get',
    params: {
      count: data.count,
      pindex: data.pindex
    }
  })
}