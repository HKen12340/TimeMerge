<h1>「{{ $EventName }}」スケジュール確定のお知らせ</h1>

<p>{{ $Text }}</p>
<p>{{ $EventName }}の日程が決定しました。</p>
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
