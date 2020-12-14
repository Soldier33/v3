import request from '/@/utils/request'

export function getData(data) {
  return request({
    url: `/api/student/class/${data.classId}`,
    method: 'get',
    params: {
        pindex: data.pindex,
        number: data.number,
    }
  })
}

export function getOption() {
    return request({
      url: '/api/class/all',
      method: 'get',
    })
}

export function add(data) {
  return request({
    url: '/api/student/add',
    method: 'POST',
    params: {
      classId: data.classId,
      name: data.name,
      sex: data.sex,
      family: data.family,
      familyPhone: data.familyPhone,
      team: data.team,
      idcard: data.idcard,
      id: data.id,
    }
  })
}

export function modify(data) {
  return request({
    url: `/api/student/${data.studentId}/modify`,
    method: 'POST',
    params: {
      studentId: data.studentId,
      id: data.id,
      name: data.name,
      sex: data.sex,
      family: data.family,
      familyPhone: data.familyPhone,
      idcard: data.idcard,
      classId: data.classId,
    }
  })
}

export function delectStudent(data) {
  return request({
    url: `/api/student/${data.studentId}/delete`,
    method: 'POST',
    params: {
      studentId: data.studentId,
      classId: data.classId
    }
  })
}

export function delectClass(data) {
  return request({
    url: `/api/student/${data.sudentId}/delete`,
    method: 'POST',
    params: {
      studentId: data.studentId,
      classId: data.classId
    }
  })
}