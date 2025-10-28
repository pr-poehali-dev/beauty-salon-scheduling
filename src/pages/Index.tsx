import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("home");
  const { toast } = useToast();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: "coloring",
      title: "Окрашивание волос",
      description: "Профессиональное окрашивание с премиальными красителями",
      price: "от 4 500 ₽",
      duration: "120 мин",
      icon: "Palette",
    },
    {
      id: "haircut",
      title: "Стрижка",
      description: "Модельная стрижка с укладкой от мастеров",
      price: "от 2 500 ₽",
      duration: "60 мин",
      icon: "Scissors",
    },
    {
      id: "manicure",
      title: "Маникюр",
      description: "Аппаратный или классический маникюр с покрытием",
      price: "от 1 800 ₽",
      duration: "90 мин",
      icon: "Sparkles",
    },
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
  ];

  const reviews = [
    {
      name: "Анна Петрова",
      text: "Прекрасный салон! Мастера — настоящие профессионалы. Результатом довольна на 100%",
      rating: 5,
      date: "2 недели назад",
    },
    {
      name: "Мария Иванова",
      text: "Очень уютная атмосфера и внимательное отношение. Буду приходить снова!",
      rating: 5,
      date: "1 месяц назад",
    },
    {
      name: "Екатерина Сидорова",
      text: "Качество услуг на высоте. Особенно понравился массаж лица — эффект WOW!",
      rating: 5,
      date: "3 недели назад",
    },
  ];

  const galleryImages = [
    "https://cdn.poehali.dev/projects/81cfd1c9-0666-4064-83a8-16b5b07b80e8/files/8f297878-d84e-42a1-a98c-46d76552c717.jpg",
    "https://cdn.poehali.dev/projects/81cfd1c9-0666-4064-83a8-16b5b07b80e8/files/271d021a-02df-4665-9886-78f32b31f7d7.jpg",
    "https://cdn.poehali.dev/projects/81cfd1c9-0666-4064-83a8-16b5b07b80e8/files/39649b50-79d2-4c0a-b05c-122b5a0c9636.jpg",
    "https://cdn.poehali.dev/projects/81cfd1c9-0666-4064-83a8-16b5b07b80e8/files/8f297878-d84e-42a1-a98c-46d76552c717.jpg",
    "https://cdn.poehali.dev/projects/81cfd1c9-0666-4064-83a8-16b5b07b80e8/files/271d021a-02df-4665-9886-78f32b31f7d7.jpg",
    "https://cdn.poehali.dev/projects/81cfd1c9-0666-4064-83a8-16b5b07b80e8/files/39649b50-79d2-4c0a-b05c-122b5a0c9636.jpg",
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime) {
      toast({
        title: "Заполните все поля",
        description: "Выберите услугу, дату и время записи",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Запись успешно создана! ✨",
      description: `${selectedService} на ${selectedDate.toLocaleDateString()} в ${selectedTime}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/30 to-background">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/95 border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary tracking-wide">ТРИ КОЛОРИСТА</h1>
            <div className="hidden md:flex gap-6">
              {[
                { id: "home", label: "Главная" },
                { id: "services", label: "Услуги" },
                { id: "booking", label: "Онлайн запись" },
                { id: "gallery", label: "Галерея" },
                { id: "reviews", label: "Отзывы" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <Button variant="default" onClick={() => scrollToSection("booking")}>
              Записаться
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="py-20 px-4 animate-fade-in bg-gradient-to-br from-background via-purple-100 to-pink-50">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 px-6 py-2 border border-primary/30 rounded-sm">
            <span className="text-xs font-light uppercase tracking-[0.2em] text-primary">Премиальный салон</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Ваша красота —<br />наше искусство
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Профессиональные косметологические услуги в элегантной атмосфере.
            <br />
            Раскройте свою природную красоту с «Три колориста».
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" onClick={() => scrollToSection("booking")} className="text-base">
              Записаться онлайн
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("services")}>
              Наши услуги
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-12 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши услуги</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Индивидуальный подход к каждому клиенту и использование
              только качественной косметики
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className="scroll-animate hover:shadow-2xl hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 border border-border"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-sm bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center mb-4 shadow-lg">
                    <Icon name={service.icon} className="w-7 h-7 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-bold text-primary">{service.price}</p>
                      <p className="text-xs text-muted-foreground">{service.duration}</p>
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedService(service.title);
                        scrollToSection("booking");
                      }}
                      variant="secondary"
                    >
                      Выбрать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 px-4 bg-gradient-to-br from-background via-indigo-50 to-purple-100">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Онлайн запись</h2>
            <p className="text-muted-foreground text-lg">
              Выберите удобное время для посещения салона
            </p>
          </div>
          <Card className="scroll-animate border border-primary/20 shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleBooking}>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="service" className="text-base mb-2 block">
                      Выберите услугу
                    </Label>
                    <select
                      id="service"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full p-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">Выберите услугу...</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title} — {service.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-base mb-3 block">Выберите дату</Label>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-lg border"
                        disabled={(date) => date < new Date()}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-base mb-3 block">Выберите время</Label>
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => setSelectedTime(time)}
                          className="h-12"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Ваше имя</Label>
                      <Input id="name" placeholder="Анна" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="comment">Комментарий (необязательно)</Label>
                    <Textarea
                      id="comment"
                      placeholder="Особые пожелания или вопросы..."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full text-base">
                    Подтвердить запись
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="gallery" className="py-20 px-4 bg-gradient-to-br from-purple-100 via-violet-50 to-fuchsia-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Галерея работ</h2>
            <p className="text-muted-foreground text-lg">
              Результаты наших мастеров говорят сами за себя
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {galleryImages.map((img, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div className="scroll-animate relative aspect-square overflow-hidden rounded-lg cursor-pointer group">
                    <img
                      src={img}
                      alt={`Работа ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors" />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <img
                    src={img}
                    alt={`Работа ${index + 1}`}
                    className="w-full h-auto rounded-lg"
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4 bg-gradient-to-br from-fuchsia-50 via-pink-50 to-purple-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-muted-foreground text-lg">
              Что говорят о нас наши клиенты
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card
                key={index}
                className="scroll-animate"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-4 text-foreground/90">
                    "{review.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border bg-gradient-to-br from-purple-100 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Три колориста</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Косметологический салон премиум-класса
                <br />
                Ваша красота — наша страсть
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" className="w-4 h-4" />
                  +7 (495) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" className="w-4 h-4" />
                  info@belle-etoile.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" className="w-4 h-4" />
                  Москва, ул. Примерная, 10
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Режим работы</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Пн-Пт: 09:00 — 21:00</p>
                <p>Сб-Вс: 10:00 — 20:00</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 Belle Étoile. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;