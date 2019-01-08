import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { EchoRequest, EchoServiceClient } from '@libs/grpcweb';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
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
