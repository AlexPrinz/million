type Environment = {
  backend: {
    protocol: 'http://' | 'https://',
    host: string,
    port: number,
    portStr?: string,
    url?: string,
  },
  webserver: {
    protocol: 'http://' | 'https://',
    host: string,
    port: number,
    portStr?: string,
    url?: string,
  },
  env: string,
};


const ENVIRONMENT: Environment = {
  backend: {
    protocol: 'http://',
    host: '192.168.240.187',
    port: 3000,
  },
  webserver: {
    protocol: 'http://',
    host: '0.0.0.0',
    port: 8080,
  },
  env: 'development',
};
const envConfig = ENVIRONMENT;
if (envConfig.backend.port) {
  envConfig.backend.portStr = `:${envConfig.backend.port}`;
} else {
  envConfig.backend.portStr = '';
}
envConfig.backend.url = envConfig.backend.protocol +
                       envConfig.backend.host +
                       envConfig.backend.portStr;
export default envConfig;
