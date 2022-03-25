# regali

Simple http proxy server implemented using deno.

## Usage

### Install

```sh
deno install 
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
regali 
```

### No Install execute

```sh
deno run 
```
