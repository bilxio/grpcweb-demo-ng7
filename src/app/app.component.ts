import { Component, OnInit, Input } from '@angular/core';
import { EchoRequest, EchoServiceClient } from '@libs/grpcweb';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-grpc-web';

  @Input()
  message: string = 'hello, grpc-web'

  responseMessage: Observable<string>;
  $resp: BehaviorSubject<string>;

  client: EchoServiceClient;

  constructor() {
    // 新建 service client
    this.client = new EchoServiceClient('http://localhost:1100');

    this.$resp = new BehaviorSubject(null);
    this.responseMessage = this.$resp.asObservable();
  }

  ngOnInit(): void {
  }

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
      // console.log(response.getMessage())
      this.$resp.next(response.getMessage());
    });
  }

}
