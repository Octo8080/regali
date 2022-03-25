# regali

Simple http proxy server implemented using deno.

## Usage

### Install

```sh
deno install --allow-read --allow-net -n regali https://raw.githubusercontent.com/Octo8080/regali/main/cli.ts
```

### Preparation config

Prepare as in the example.

```json 
{
  "/a/": {
    "target": "http://0.0.0.0:80",
    "replace": true
  },
  "/b/": {
    "target": "http://0.0.0.0:81",
    "replace": false
  },
  "/": {
    "target": "http://0.0.0.0:82",
    "replace": true
  }
}
```

If you write as above, it will be processed as follows.


```
/a/aaa => http://0.0.0.0:82/aaa

/b/bbb => http://0.0.0.0:82/b/bbb

/c/ccc => http://0.0.0.0:82/c/ccc
```

### Execute

```sh 
# Use defualt config file `proxy_config.json`
# Use defualt port `8080`

regali 

# Use custom config file
regali --config=custom_proxy_config.json

# Use  port `8081`
regali --port=8081
```

### No Install execute

```sh
deno run --allow-read --allow-net https://raw.githubusercontent.com/Octo8080/regali/main/cli.ts 
```
