import { useState } from "react";
import { Folder, Pencil, Trash2, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Category {
    id: string;
    name: string;
    image?: string;
}

export const CategoryManagement = () => {
    const [categories, setCategories] = useState<Category[]>([
        { id: "1", name: "Action" },
        { id: "2", name: "Comedy" },
        { id: "3", name: "Drama" },
        { id: "4", name: "Horror" },
        { id: "5", name: "Sci-Fi" },
        { id: "6", name: "Documentary" },
    ]);
    const [newCategory, setNewCategory] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    // Handle image selection
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    // Add new category
    const handleAddCategory = () => {
        if (newCategory.trim()) {
            if (editingCategory) {
                // Update existing category
                setCategories(categories.map(cat =>
                    cat.id === editingCategory.id
                        ? {
                            ...cat,
                            name: newCategory,
                            image: selectedImage ? URL.createObjectURL(selectedImage) : cat.image
                        }
                        : cat
                ));
                setEditingCategory(null);
            } else {
                // Add new category
                const newCat: Category = {
                    id: (categories.length + 1).toString(),
                    name: newCategory,
                    image: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
                };
                setCategories([...categories, newCat]);
            }
            setNewCategory("");
            setSelectedImage(null);
        }
    };

    // Start editing category
    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setNewCategory(category.name);
        setSelectedImage(null);
    };

    // Delete category
    const handleDeleteCategory = (id: string) => {
        setCategories(categories.filter(cat => cat.id !== id));
    };

    return (
        <div className="relative z-0 p-6">
            {/* Header */}
            <div className="relative z-10 flex items-center justify-center mb-8">
                <div className="text-center">
                    <div className="relative z-10 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Folder className="w-8 h-8 text-black" />
                    </div>
                    <h1 className="relative z-10 text-4xl font-bold text-yellow-400 mb-2">Category Management</h1>
                    <p className="relative z-10 text-gray-400">Organize and manage your content categories with style</p>
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Add New Category Section */}
                <Card className="relative z-20 p-6 bg-[#1c2632] border-[#364253]">
                    <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Category
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-yellow-400 font-medium mb-2">Category Name</label>
                            <Input
                                placeholder="e.g., Thriller, Fantasy, Adventure"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                className="bg-[#131920] border-[#364253] text-gray-200"
                            />
                        </div>

                        <div>
                            <label className="block text-yellow-400 font-medium mb-2">Category Image (Optional)</label>
                            <div
                                className="border-2 border-dashed border-[#364253] rounded-lg p-6 text-center bg-[#131920] cursor-pointer"
                                onClick={() => document.getElementById('categoryImage')?.click()}
                            >
                                <input
                                    type="file"
                                    id="categoryImage"
                                    className="hidden"
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={handleImageSelect}
                                />
                                <Folder className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-300 mb-1">Choose category thumbnail</p>
                                <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 5MB</p>
                                <p className="text-xs text-yellow-400 mt-2 hover:underline">
                                    Click to browse or drag & drop
                                </p>
                            </div>
                        </div>

                        <Button
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
                            onClick={handleAddCategory}
                        >
                            {editingCategory ? (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Update Category
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Category
                                </>
                            )}
                        </Button>
                    </div>
                </Card>

                {/* Existing Categories Section */}
                <Card className="relative z-20 p-6 bg-[#1c2632] border-[#364253]">
                    <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                        <Folder className="w-5 h-5 mr-2" />
                        Existing Categories
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="group relative bg-[#131920] border border-[#364253] rounded-lg p-4 flex items-center justify-between"
                            >
                                <div className="flex items-center space-x-3">
                                    {category.image ? (
                                        <img src={category.image} alt={category.name} className="w-8 h-8 rounded" />
                                    ) : (
                                        <Folder className="w-8 h-8 text-gray-400" />
                                    )}
                                    <span className="text-gray-200">{category.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400 hover:text-yellow-500 hover:bg-[#1c2632]"
                                        onClick={() => handleEditCategory(category)}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-500 hover:bg-[#1c2632]"
                                        onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total Categories */}
                    <div className="relative z-20 mt-6 p-4 bg-[#131920] border border-[#364253] rounded-lg">
                        <h3 className="text-gray-400">Total Categories</h3>
                        <div className="flex items-center space-x-2">
                            <span className="text-3xl font-bold text-yellow-400">{categories.length}</span>
                            <span className="text-gray-400 text-sm">Manage your content organization</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
