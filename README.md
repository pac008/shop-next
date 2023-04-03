# Next.js teslo shop App
Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```
* el -d, significa __detached__


* MongoDB url local:
```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno 
Renombrar el archivo __.env-template__ a __.env__

## Llenar la base de datos con información de pruebas
Llamará:
```
http://localhost:3000/api/seed
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.