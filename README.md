1.

export function ping(ip, callback) {
    const startTime = process.hrtime.bigint();

    const client = net.createConnection({ port: 80, host: ip });

    client.on('connect', () => {
        const endTime = process.hrtime.bigint();
        const timeTaken = Number(endTime - startTime) / 1e6; // Convertir a milisegundos
        callback(null, `Ping successful. Time: ${timeTaken.toFixed(2)}ms, IP: ${ip}`);
        client.end();
    });

    client.on('error', (error) => {
        callback('Ping failed', null);
    });
}