import net from 'node:net';

export const isPortAvailable = (port: number, host: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const socket = new net.Socket();

    socket.setTimeout(500);

    socket.once('connect', () => {
      socket.destroy();
      resolve(false);
    });

    socket.once('error', (err: NodeJS.ErrnoException) => {
      socket.destroy();
      resolve(true);
    });

    socket.once('timeout', () => {
      socket.destroy();
      resolve(true);
    });

    socket.connect(port, host);
  });
};
