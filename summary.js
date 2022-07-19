// Önce Redux store ve provider'ımızı oluşturduk. Sonrada todos altında todosSlice isminde bir tanım oluşturduk.

// Biz createAsyncThunk'ı bir middleware olarak kullanıyoruz. Yani bu action' bekletebilmek için araya girebilmek için çünkü yaptığımız backend'e gitme işlemi bir asengron işlem ve ne zaman biteceği belirsiz dolayısıyla bir middleware oluşturmak gerekiyor. Bu middleware'ide bize createAsync Thunk veriyor.

// createAsyncThunk'ın ilk parametresinde ne işlem yaptıracaksak onu veriyoruz. Thunk bizim için pending, fullfiled ve error durumlarını oluşturuyor.

// extraReducers'da her bir asengron işlemin pending, fulfilled ve rejected durumlarını biz karşılayabiliyoruz ve state'i bu durumlara göre güncelleyebiliyoruz. Örneğin loading isminde state üzerinde bir elemanım var bunun durumunu pending durumunda true yaparken işlem başarılı olduğunda false'a çekiyorum aynı zamanda başarısız olduğunda da false'a çekiyorum.

// Asengron bir işlemi dispatch etmek normal bir action dispatch etmekten farksız. Direk olarak action'ımı useEffect içinde dispatch edebiliyorum. Elbette onu sayfayada dahil etmek gerekiyor. Biz services isminde bir dosya açıp tüm asengron tanımları onun içine yazdık.
