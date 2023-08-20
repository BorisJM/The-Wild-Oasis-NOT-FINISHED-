import supabase from "./supabase";

export async function addNewGuest(newGuest) {

  const { data, error } = await supabase
    .from("guests")
    .insert([newGuest])
    .select();
}
