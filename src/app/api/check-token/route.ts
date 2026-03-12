// app/api/check-token/route.ts
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Инициализируем клиента Supabase (работает только на сервере)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    // 1. Получаем токен из тела запроса
    const body = await request.json();
    const { token, deviceId } = body;

    // Если токен вообще не прислали, сразу отказываем
    if (!token) {
      return NextResponse.json({ isValid: false }, { status: 400 });
    }

    // 2. Ищем токен в таблице access_tokens
    // Предполагаем, что таблица называется access_tokens,
    // а колонки: 'token' (сам ключ) и 'is_active' (булево значение)
    const { data, error } = await supabase
      .from("access_tokens")
      .select("*")
      .eq("token", token)
      .eq("is_active", true)
      .single();

    // 3. Если произошла ошибка (токен не найден) или data пустая
    if (error || !data) {
      return NextResponse.json({ isValid: false });
    }
    console.log(data);

    // Сценарий 1: Первая активация (поле device_id в БД еще пустое)
    if (data.device_id === null) {
      await supabase
        .from("access_tokens")
        .update({ device_id: deviceId })
        .eq("token", token);

      return NextResponse.json({ isValid: true });
    }

    // Сценарий 2: Возвращение хозяина (ID совпадает с тем, что в БД)
    if (data.device_id === deviceId) {
      return NextResponse.json({ isValid: true });
    }

    // Сценарий 3: Чужое устройство (токен есть, но ID не совпадает)

    return NextResponse.json({ isValid: false });
  } catch (error) {
    console.error("Ошибка сервера при проверке токена:", error);
    return NextResponse.json({ isValid: false }, { status: 500 });
  }
}
