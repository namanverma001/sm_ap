import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AdminNavbar } from '@/components/AdminNavbar';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const UploadContent = () => {
    const [category, setCategory] = useState('');
    const [watchAge, setWatchAge] = useState('');
    const [genre, setGenre] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const isMobile = useIsMobile();

    const handleMenuToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-cms-bg overflow-hidden">
            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main className="flex flex-col flex-1 overflow-hidden">
                <div className="flex items-center bg-cms-sidebar-bg border-b border-cms-border px-4 h-16">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="mr-4 text-cms-text-primary"
                        onClick={handleMenuToggle}
                    >

                    </Button>
                </div>
                <div className="container mx-auto p-6 relative z-10">
                    <Card className="p-6 relative">
                        <h1 className="text-2xl font-bold mb-6">ADD CONTENT</h1>
                        <div className="grid gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Category</Label>
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger className="bg-cms-sidebar-bg text-cms-text-primary border-cms-border">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-cms-sidebar-bg border-cms-border">
                                            <SelectGroup>
                                                <SelectItem className="text-cms-text-primary focus:bg-cms-sidebar-hover focus:text-cms-text-primary" value="webseries">Web Series</SelectItem>
                                                <SelectItem className="text-cms-text-primary focus:bg-cms-sidebar-hover focus:text-cms-text-primary" value="movie">Movie</SelectItem>
                                                <SelectItem className="text-cms-text-primary focus:bg-cms-sidebar-hover focus:text-cms-text-primary" value="episode">Episode</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Title</Label>
                                    <Input type="text" placeholder="Enter title" />
                                </div>
                            </div>

                            {category === 'episode' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Season Number</Label>
                                        <Input type="number" placeholder="Enter season number" />
                                    </div>
                                    <div>
                                        <Label>Episode Number</Label>
                                        <Input type="number" placeholder="Enter episode number" />
                                    </div>
                                </div>
                            )}

                            <div>
                                <Label>Description</Label>
                                <Textarea placeholder="Enter description" className="h-32" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Year (Created At)</Label>
                                    <Input type="number" placeholder="Enter year" />
                                </div>
                                <div>
                                    <Label>Average Rating</Label>
                                    <Input type="number" step="0.1" min="0" max="10" placeholder="Enter rating" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Watch Age</Label>
                                    <Select value={watchAge} onValueChange={setWatchAge}>
                                        <SelectTrigger className="bg-cms-sidebar-bg text-cms-text-primary border-cms-border">
                                            <SelectValue placeholder="Select age" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-cms-sidebar-bg border-cms-border">
                                            <SelectGroup>
                                                <SelectItem className="text-cms-text-primary focus:bg-cms-sidebar-hover focus:text-cms-text-primary" value="all">All Ages</SelectItem>
                                                <SelectItem className="text-cms-text-primary focus:bg-cms-sidebar-hover focus:text-cms-text-primary" value="7+">7+</SelectItem>
                                                <SelectItem className="text-cms-text-primary focus:bg-cms-sidebar-hover focus:text-cms-text-primary" value="13+">13+</SelectItem>
                                                <SelectItem className="text-cms-text-primary focus:bg-cms-sidebar-hover focus:text-cms-text-primary" value="16+">16+</SelectItem>
                                                <SelectItem className="text-cms-text-primary focus:bg-cms-sidebar-hover focus:text-cms-text-primary" value="18+">18+</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Genre</Label>
                                    <Select value={genre} onValueChange={setGenre}>
                                        <SelectTrigger className="bg-cms-sidebar-bg text-cms-text-primary border-cms-border">
                                            <SelectValue placeholder="Select genre" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-cms-sidebar-bg border-cms-border">
                                            <SelectGroup>
                                                <SelectItem className="text-cms-text-primary focus:bg-cms-sidebar-hover focus:text-cms-text-primary" value="action">Action</SelectItem>
                                                <SelectItem className="text-cms-text-primary focus:bg-cms-sidebar-hover focus:text-cms-text-primary" value="comedy">Comedy</SelectItem>
                                                <SelectItem className="text-cms-text-primary focus:bg-cms-sidebar-hover focus:text-cms-text-primary" value="drama">Drama</SelectItem>
                                                <SelectItem className="text-cms-text-primary focus:bg-cms-sidebar-hover focus:text-cms-text-primary" value="scifi">Sci-Fi</SelectItem>
                                                <SelectItem className="text-cms-text-primary focus:bg-cms-sidebar-hover focus:text-cms-text-primary" value="thriller">Thriller</SelectItem>
                                                <SelectItem className="text-cms-text-primary focus:bg-cms-sidebar-hover focus:text-cms-text-primary" value="horror">Horror</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Button className="w-full mt-4" size="lg">
                                Upload Content
                            </Button>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default UploadContent;
