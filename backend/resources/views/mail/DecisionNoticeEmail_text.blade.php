「{{ $EventName }}」スケジュール確定のお知らせ

{{ $Text }}

{{ $EventName }}の日程が決定しました。

日時
@foreach ($Dates as $Date)
  {{ $Date }}
@endforeach

参加者
@foreach ($Members as $Member)
  {{ $Member }}
@endforeach