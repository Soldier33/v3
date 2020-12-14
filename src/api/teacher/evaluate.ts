import request from '/@/utils/request'

export function getOption() {
  return request({
    url: '/api/class/teach',
    method: 'get',
  })
}

export function getSubject(classId) {
  return request({
    url: '/api/teacher/teach/subject',
    method: 'get',
    params: {
      classId,
    }
  })
}

export function getData(data) {
  return request({
    url: `/api/integral/school/week/${data.week}/class/${data.classId}`,
    method: 'get',
    // startId=1&endId=100
    params: {
      startId: data.pindex,
      endId: data.endId,
    }
  })
}

export function getEvaluate() {
  return request({
    url:'/api/teacher/evaluate',
    method: 'get'
  })
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