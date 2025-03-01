export const paths = {
  home: {
    getHref: () => '/'
  },
  auth: {
    login: {
      getHref: () => '/login'
    },
    register: {
      getHref: () => '/signup'
    },
    verify: {
      getHref: () => '/verify'
    }
  },
  projectAll: {
    getHref: () => '/all-project'
  },
  projectDetail: {
    blackboxTest: {
      getHref: (id: string) => `/project/${id}/blackbox-test/use-case`,
      scenario: {
        getHref: (id: string) => `/scenario/${id}` //add on top
      }
    },
    dashboard: {
      getHref: (id: string) => `/project/${id}/dashboard`
    },
    report: {
      getHref: (id: string) => `/project/${id}/report`
    },
    unitTest: {
      getHref: (id: string) => `/project/${id}/unit-test`
    },
    setting: {
      getHref: (id: string) => `/project/${id}/setting`
    }
  },
  setting: {
    getHref: () => '/setting'
  }
};
