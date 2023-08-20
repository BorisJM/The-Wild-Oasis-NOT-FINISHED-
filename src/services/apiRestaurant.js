import supabase from "./supabase";

export async function getBills() {
  let { data, error } = await supabase.from("restaurant").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return { data, error };
}

export async function createBill(newBill) {
  const { data, error } = await supabase
    .from("restaurant")
    .insert([newBill])
    .select();

  return { data, error };
}
