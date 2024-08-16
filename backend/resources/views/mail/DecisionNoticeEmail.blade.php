<h1>メールテスト</h1>
<p>会員登録ありがとうございます。</p>
<p>無事に登録完了しました。</p>

<p>{{ $Text }}</p>

日付
<ul>
@foreach ($Dates as $Date)
  <li>{{ $Date }}</li>
@endforeach
</ul>

参加者
<ul>
@foreach ($Members as $Member)
  <li>{{ $Member }}</li>
@endforeach
</ul>
