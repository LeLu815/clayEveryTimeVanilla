{
  providerId: 'firebase',
  proactiveRefresh: ProactiveRefresh {
    user: [Circular *1],
    isRunning: false,
    timerId: null,
    errorBackoff: 30000
  },
  reloadUserInfo: {
    localId: 't4EAqwTgqJV84tU3ZWBaBXwIRlI3',
    email: 'leein9404@naver.com',
    displayName: '이인최고',
    passwordHash: 'UkVEQUNURUQ=',
    emailVerified: false,
    passwordUpdatedAt: 1684410397380,
    providerUserInfo: [ [Object] ],
    validSince: '1684410397',
    lastLoginAt: '1684738523414',
    createdAt: '1684410397380',
    lastRefreshAt: '2023-05-22T06:55:23.414Z'
  },
  reloadListener: null,
  uid: 't4EAqwTgqJV84tU3ZWBaBXwIRlI3',
  auth: <ref *2> AuthImpl {
    app: FirebaseAppImpl {
      _isDeleted: false,
      _options: [Object],
      _config: [Object],
      _name: '[DEFAULT]',
      _automaticDataCollectionEnabled: false,
      _container: [ComponentContainer]
    },
    heartbeatServiceProvider: Provider {
      name: 'heartbeat',
      container: [ComponentContainer],
      component: [Component],
      instances: [Map],
      instancesDeferred: Map(0) {},
      instancesOptions: [Map],
      onInitCallbacks: Map(0) {}
    },
    appCheckServiceProvider: Provider {
      name: 'app-check-internal',
      container: [ComponentContainer],
      component: null,
      instances: Map(0) {},
      instancesDeferred: Map(0) {},
      instancesOptions: Map(0) {},
      onInitCallbacks: Map(0) {}
    },
    config: {
      apiKey: 'AIzaSyBGOlK6exZcKSoYKgrId2rpJmIE2B8fTFo',
      authDomain: 'clayeverytimevanilla.firebaseapp.com',
      clientPlatform: 'Node',
      apiHost: 'identitytoolkit.googleapis.com',
      tokenApiHost: 'securetoken.googleapis.com',
      apiScheme: 'https',
      sdkClientVersion: 'Node/JsCore/9.22.0/FirebaseCore-web'
    },
    currentUser: [Circular *1],
    emulatorConfig: null,
    operations: Promise { undefined },
    authStateSubscription: Subscription {
      auth: [Circular *2],
      observer: [ObserverProxy],
      addObserver: [Function: bound subscribe]
    },
    idTokenSubscription: Subscription {
      auth: [Circular *2],
      observer: [ObserverProxy],
      addObserver: [Function: bound subscribe]
    },
    beforeStateQueue: AuthMiddlewareQueue { auth: [Circular *2], queue: [] },
    redirectUser: null,
    isProactiveRefreshEnabled: false,
    _canInitEmulator: false,
    _isInitialized: true,
    _deleted: false,
    _initializationPromise: Promise { undefined },
    _popupRedirectResolver: null,
    _errorFactory: ErrorFactory {
      service: 'auth',
      serviceName: 'Firebase',
      errors: [Object]
    },
    _agentRecaptchaConfig: null,
    _tenantRecaptchaConfigs: {},
    lastNotifiedUid: 't4EAqwTgqJV84tU3ZWBaBXwIRlI3',
    languageCode: null,
    tenantId: null,
    settings: { appVerificationDisabledForTesting: false },
    frameworks: [],
    name: '[DEFAULT]',
    clientVersion: 'Node/JsCore/9.22.0/FirebaseCore-web',
    persistenceManager: PersistenceUserManager {
      persistence: [InMemoryPersistence],
      auth: [Circular *2],
      userKey: 'authUser',
      fullUserKey: 'firebase:authUser:AIzaSyBGOlK6exZcKSoYKgrId2rpJmIE2B8fTFo:[DEFAULT]',
      fullPersistenceKey: 'firebase:persistence:AIzaSyBGOlK6exZcKSoYKgrId2rpJmIE2B8fTFo:[DEFAULT]',
      boundEventHandler: [Function: bound _onStorageEvent] AsyncFunction
    }
  },
  stsTokenManager: StsTokenManager {
    refreshToken: 'APZUo0SuKPDeLc8_xbp6WP-WNBq4bysUSfL444Igc_bkYAoNB6AWhCSIYz1ZiRE_TSn2VOu8p138_YV8OB4HMP0yE1z9A73GqW-GYp_EnHkRoQ4jton_y2tB-U_cQA2by2VAUWd8YwF-DrSCwjphN_VW99a8noshNsNh4BvcFQ0NcO7kIpVNVLFugDbyDC1KgoWsPP0hQO0cbok4f8a37uVbNLrzz05UO8uwwQPHBs_rlaEYmLAxFOE',
    accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwZTFkMjM5MDllNzZmZjRhNzJlZTA4ODUxOWM5M2JiOTg4ZjE4NDUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoi7J207J247LWc6rOgIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2NsYXlldmVyeXRpbWV2YW5pbGxhIiwiYXVkIjoiY2xheWV2ZXJ5dGltZXZhbmlsbGEiLCJhdXRoX3RpbWUiOjE2ODQ3Mzg1MjMsInVzZXJfaWQiOiJ0NEVBcXdUZ3FKVjg0dFUzWldCYUJYd0lSbEkzIiwic3ViIjoidDRFQXF3VGdxSlY4NHRVM1pXQmFCWHdJUmxJMyIsImlhdCI6MTY4NDczODUyMywiZXhwIjoxNjg0NzQyMTIzLCJlbWFpbCI6ImxlZWluOTQwNEBuYXZlci5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibGVlaW45NDA0QG5hdmVyLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.JlHBlyw96i3o1Jv7E1YTy4qA0ajCHwz4G0qlrfTUNEsG_XBwrAADWQIREcrsWIAI51-No0tLbUkEzN7YkB5X605uZjbgOPRlGoG8Ss2XgfUt19kC3dqITX8QzDGKJcz9BuJgXKzoYSNCiGkUAO61rM6RtiZqCJn00RsBCLzmUpnkWBwmt9nTt168GEuDRvXTDx4KH3gdP0O4AIpCEFYptiUqYM7s31io6jeJybCTtuaMnT0KshU-sFK3RMoqaRoxt5RgohFawvvFQUv7gdpxi8BDXLnLg_GIHgXIN8AKt9mRLYwtWCFasRiE3t5o5JCkempzZ4ljbWVX8Gk6MLliQg',
    expirationTime: 1684742123423
  },
  accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwZTFkMjM5MDllNzZmZjRhNzJlZTA4ODUxOWM5M2JiOTg4ZjE4NDUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoi7J207J247LWc6rOgIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2NsYXlldmVyeXRpbWV2YW5pbGxhIiwiYXVkIjoiY2xheWV2ZXJ5dGltZXZhbmlsbGEiLCJhdXRoX3RpbWUiOjE2ODQ3Mzg1MjMsInVzZXJfaWQiOiJ0NEVBcXdUZ3FKVjg0dFUzWldCYUJYd0lSbEkzIiwic3ViIjoidDRFQXF3VGdxSlY4NHRVM1pXQmFCWHdJUmxJMyIsImlhdCI6MTY4NDczODUyMywiZXhwIjoxNjg0NzQyMTIzLCJlbWFpbCI6ImxlZWluOTQwNEBuYXZlci5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibGVlaW45NDA0QG5hdmVyLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.JlHBlyw96i3o1Jv7E1YTy4qA0ajCHwz4G0qlrfTUNEsG_XBwrAADWQIREcrsWIAI51-No0tLbUkEzN7YkB5X605uZjbgOPRlGoG8Ss2XgfUt19kC3dqITX8QzDGKJcz9BuJgXKzoYSNCiGkUAO61rM6RtiZqCJn00RsBCLzmUpnkWBwmt9nTt168GEuDRvXTDx4KH3gdP0O4AIpCEFYptiUqYM7s31io6jeJybCTtuaMnT0KshU-sFK3RMoqaRoxt5RgohFawvvFQUv7gdpxi8BDXLnLg_GIHgXIN8AKt9mRLYwtWCFasRiE3t5o5JCkempzZ4ljbWVX8Gk6MLliQg',
  displayName: '이인최고',
  email: 'leein9404@naver.com',
  emailVerified: false,
  phoneNumber: null,
  photoURL: null,
  isAnonymous: false,
  tenantId: null,
  providerData: [
    {
      providerId: 'password',
      uid: 'leein9404@naver.com',
      displayName: '이인최고',
      email: 'leein9404@naver.com',
      phoneNumber: null,
      photoURL: null
    }
  ],
  metadata: UserMetadata {
    createdAt: '1684410397380',
    lastLoginAt: '1684738523414',
    lastSignInTime: 'Mon, 22 May 2023 06:55:23 GMT',
    creationTime: 'Thu, 18 May 2023 11:46:37 GMT'
  }
}