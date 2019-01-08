# grpcweb-demo-ng7

> 一个整合了 angular 7 和  grpc-web 的小例子

添加依赖包

```
npm i @types/google-protobuf google-protobuf grpc-web grpc-web-client
```

使用 protoc 自动生成 TS 和 JS 等相关 stub 文件

```
protoc -I=./proto echo.proto \
  --js_out=import_style=commonjs:./gen-js \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:./gen-js \
  --ts_out=service=true:./gen-ts \
  --go_out=plugins=grpc:./gen-go/echo
```

复制 ts 和 js 文件至项目源码下:

```
cp * ./src/libs/grpcweb/
```

tsconfig.json 增加下面内容，添加 `.d.ts` 引用

```json
{
  "files": [
    "src/libs/grpcweb/echo_pb.d.ts",
    "src/libs/grpcweb/echo_pb_service.d.ts"
  ]
}
```

最后，修改 app.component

```ts
export class AppComponent implements OnInit, OnDestroy {

  title = 'ng-grpc-web';

  @Input()
  message: string = 'hello, grpc-web'

  // 服务端响应内容
  responseMessage: Observable<string>;
  $resp: BehaviorSubject<string>;

  // grpc-web client
  client: EchoServiceClient;

  constructor() {
    // 新建 service client
    this.client = new EchoServiceClient(environment.grpcServerAddr);

    this.$resp = new BehaviorSubject(null);
    this.responseMessage = this.$resp.asObservable();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.$resp.unsubscribe()
    this.$resp.complete()
  }

  // 向 GRPC 服务器发送请求
  sendReq() {
    // 创建 request
    var request = new EchoRequest();
    request.setMessage(this.message);

    // 发起 rpc 调用
    this.client.echo(request, null, (err, response) => {
      if (err) {
        console.error(err)
        return
      }
      this.$resp.next(response.getMessage());
    });
  }

}
```

服务端可以自行基于 `proto/echo.proto` 文件构建。

# OLD README


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
